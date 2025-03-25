using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("enrollments")]
    public class Enrollment
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("student_id")]
        public int StudentId { get; set; }

        [Column("course_id")]
        public int CourseId { get; set; }

        [Column("enrolled_date")]
        public DateTime EnrolledDate { get; set; }
    }
}
