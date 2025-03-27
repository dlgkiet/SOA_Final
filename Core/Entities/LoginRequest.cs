using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Keyless]  // Đảm bảo LoginRequest không được coi là entity có khóa chính
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
