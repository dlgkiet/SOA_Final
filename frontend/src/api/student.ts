import axiosInstance from '../utils/axiosInstance';

// Lấy danh sách khóa học mà sinh viên đang tham gia
export const fetchCoursesForStudent = async (studentId: number) => {
  try {
    const response = await axiosInstance.get('/courses'); // Lấy tất cả khóa học từ API

    // Lọc các khóa học mà sinh viên đang tham gia
    const filteredCourses = response.data.filter((course: any) =>
      course.studentIds?.includes(studentId)
    );

    return filteredCourses; // Trả về danh sách khóa học mà sinh viên đang tham gia
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses for student');
  }
};

// Lấy tất cả câu hỏi và lọc theo testId
export const fetchQuestionsByTestId = async (testId: number) => {
  try {
    const response = await axiosInstance.get("/Question"); // Lấy toàn bộ câu hỏi

    console.log(response)

    const filteredQuestions = response.data.filter((q: any) => q.testId === testId); // Lọc theo testId

    return filteredQuestions; // Trả về danh sách câu hỏi đã lọc
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Không thể lấy danh sách câu hỏi");
  }
};


// Gửi câu trả lời của sinh viên lên API
export const submitAnswers = async (studentId: number, testId: number, selectedAnswers: { questionId: number; selectedAnswer: string }[]) => {
  try {
    const response = await axiosInstance.post("/Answer/submit-answer", {
      studentId,
      testId,
      selectedAnswers,
    });

    return response.data; // Trả về kết quả từ server
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Không thể gửi bài kiểm tra");
  }
};

// ✅ Lấy danh sách câu trả lời theo `testId`
export const fetchAnswersByTestId = async (testId: number) => {
  try {
    const response = await axiosInstance.get(`/Answer`); // Lấy toàn bộ danh sách

    // ✅ Lọc danh sách theo testId
    const filteredAnswers = response.data.filter((answer: any) => answer.testId === testId);

    return filteredAnswers;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Không thể lấy danh sách câu trả lời");
  }
};

// ✅ Hàm lấy dữ liệu câu hỏi, câu trả lời sinh viên & đáp án đúng
export const processTestData = async (testId: number) => {
  try {
    const questions = await fetchQuestionsByTestId(testId);
    const answers = await fetchAnswersByTestId(testId);

    const studentAnswersMap: { [key: number]: string[] } = {};
    answers.forEach((answer: any) => {
      answer.selectedAnswers.forEach((selection: any) => {
        if (!studentAnswersMap[selection.questionId]) {
          studentAnswersMap[selection.questionId] = [];
        }
        studentAnswersMap[selection.questionId].push(selection.choice);
      });
    });

    let correctCount = 0;
    const processedData = questions.map((question: any) => {
      const studentAnswers = studentAnswersMap[question.id] || [];
      const isCorrect = studentAnswers.includes(question.correctAnswer);
      if (isCorrect) correctCount++;

      return {
        id: question.id,
        content: question.content,
        options: {
          A: question.optionA,
          B: question.optionB,
          C: question.optionC,
          D: question.optionD,
        },
        studentAnswers,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const totalQuestions = questions.length;
    const score = (correctCount / totalQuestions) * 10;

    console.log("Correct Count:", correctCount);
    console.log("Total Questions:", totalQuestions);
    console.log("Calculated Score:", score);
    

    return { processedData, correctCount, totalQuestions, score };

  } catch (error: any) {
    throw new Error(error.message || "Lỗi khi xử lý dữ liệu bài kiểm tra");
  }
};

