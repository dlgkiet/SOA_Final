using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("admins")]  // Chỉ định tên bảng trong cơ sở dữ liệu
    public class Admin
    {
        [Column("id")]  // Đảm bảo tên cột trong cơ sở dữ liệu là id
        public int Id { get; set; }

        [Column("name")]  // Đảm bảo tên cột trong cơ sở dữ liệu là name
        public string Name { get; set; }

        [Column("birthday")]  // Đảm bảo tên cột trong cơ sở dữ liệu là birthday
        public DateTime Birthday { get; set; }

        [Column("email")]  // Đảm bảo tên cột trong cơ sở dữ liệu là email
        public string Email { get; set; }

        [Column("password")]  // Đảm bảo tên cột trong cơ sở dữ liệu là password
        public string Password { get; set; }
    }
}
