
﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("courses")] // Chỉ định tên bảng trong PostgreSQL
    public class Course
    {
        [Key]
        [Column("id")] // Đảm bảo tên cột trong cơ sở dữ liệu là id
        public int Id { get; set; }

        [Column("name")] // Đảm bảo tên cột trong cơ sở dữ liệu là name
        public string Name { get; set; }

        [Column("description")] // Đảm bảo tên cột trong cơ sở dữ liệu là description
        public string Description { get; set; }

        [Column("schedule")] // Đảm bảo tên cột trong cơ sở dữ liệu là schedule
        public string Schedule { get; set; }

        [Column("teacher_id")] // Đảm bảo tên cột trong cơ sở dữ liệu là teacher_id
        public int TeacherId { get; set; }

        [Column("student_id")] // Đảm bảo tên cột trong cơ sở dữ liệu là student_id
        public int StudentId { get; set; }
        [Column("student_ids", TypeName = "integer[]")] // Ánh xạ với PostgreSQL ARRAY
        public List<int>? StudentIds { get; set; }

        [Column("created_at")] // Đảm bảo tên cột trong cơ sở dữ liệu là created_at
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
