using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    [Table("teachers")]  // Chỉ định tên bảng trong cơ sở dữ liệu
    public class Teacher
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int ClassId { get; set; }
    }
}
