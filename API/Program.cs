using DataAccess.Context;
using DataAccess.IReposiories;
using DataAccess.IRepositories;
using DataAccess.Repositories;

using Microsoft.EntityFrameworkCore;
using Service.IServices;
using Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;  // Để sử dụng TokenValidationParameters và SymmetricSecurityKey
using System.Text;
using Microsoft.Data.SqlClient;  // Để sử dụng Encoding
using Microsoft.OpenApi.Models;  // Thêm thư viện này để sử dụng OpenApiInfo, OpenApiSecurityScheme, SecuritySchemeType
using Microsoft.Extensions.FileProviders;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",   // Vite mặc định
                "http://localhost:3000",   // Nếu chạy React trên 3000
                "http://localhost:3001",    // Nếu chạy Docker frontend dev
                "https://soa-final-1.onrender.com",
                "https://localhost:5173"
            )
            .SetIsOriginAllowed(origin => true) // 🔥 Cần để tránh lỗi CORS khi AllowCredentials
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});


// 🔥 Bật hỗ trợ JSON động
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
NpgsqlConnection.GlobalTypeMapper.EnableDynamicJson();


// Add services to the container.
builder.Services.AddControllers();

// Cấu hình kết nối cơ sở dữ liệu với PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// C?u hình Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

    // Cấu hình Swagger để hỗ trợ Bearer Authentication
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


// Cấu hình JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],  // Thay bằng issuer thực tế của bạn
            ValidAudience = builder.Configuration["Jwt:Audience"],  // Thay bằng audience thực tế của bạn
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))  // Secret key cho JWT
        };
    });


builder.Services.AddAuthorization(options =>
{
    // Thêm các chính sách phân quyền
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("TeacherOrAdmin", policy => policy.RequireRole("Teacher", "Admin"));
    options.AddPolicy("StudentOrAdmin", policy => policy.RequireRole("Student", "Admin"));
});


// Thêm các dịch vụ 
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IAnswerRepository, AnswerRepository>();
builder.Services.AddScoped<IAnswerService, AnswerService>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<ITestService, TestService>();

// Đăng ký AuthService vào DI container
builder.Services.AddScoped<AuthService>();  


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Cấu hình middleware
app.UseAuthentication(); // Xác thực JWT
app.UseAuthorization();  // Phân quyền

// Cấu hình để phục vụ file tĩnh từ thư mục wwwroot/uploads
var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});

app.MapControllers();

app.Run();