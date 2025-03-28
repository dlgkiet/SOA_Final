using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    [Table("lessons")]
    public class Lesson
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        public string Content { get; set; }

        [Column("files")]
        public List<string>? Files { get; set; } = new List<string>();

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Column("teacher_id")]
        public int TeacherId { get; set; }

        [Column("course_id")]
        public int CourseId { get; set; }

        // Đảm bảo tất cả giá trị DateTime đều được chuyển thành UTC trước khi lưu
        public void SetUtcDates()
        {
            CreatedAt = DateTime.SpecifyKind(CreatedAt, DateTimeKind.Utc);
            UpdatedAt = DateTime.SpecifyKind(UpdatedAt, DateTimeKind.Utc);
        }
    }
}
