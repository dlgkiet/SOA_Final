# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY *.sln ./
COPY API/API.csproj API/
COPY Business/Business.csproj Business/
COPY Common/Common.csproj Common/
COPY Core/Core.csproj Core/
COPY DataAccess/DataAccess.csproj DataAccess/
COPY Service/Service.csproj Service/
RUN dotnet restore

# Chỉ copy phần còn lại sau restore
COPY . .

WORKDIR /src/API
RUN dotnet publish -c Release -o /app/publish


# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Mở port mặc định
EXPOSE 80
ENTRYPOINT ["dotnet", "API.dll"]
