import { Plus, Edit, Trash } from 'lucide-react'; // Import icon từ lucide-react

interface Test {
  id: number;
  content: string;
  deadline: string;
}

interface TestListProps {
  tests: Test[];
}

const TestList = ({ tests }: TestListProps) => {
  const handleCreateQuestion = (testId: number) => {
    console.log('Tạo câu hỏi cho bài kiểm tra', testId);
  };

  const handleEditTest = (testId: number) => {
    console.log('Chỉnh sửa bài kiểm tra', testId);
  };

  const handleDeleteTest = (testId: number) => {
    console.log('Xóa bài kiểm tra', testId);
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Bài kiểm tra</h3>
      {tests.length > 0 ? (
        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white p-4 border rounded-lg shadow-md">
              {/* Tiêu đề bài kiểm tra là nội dung bài kiểm tra */}
              <h4 className="text-xl font-medium mb-2">{test.content}</h4> {/* Tiêu đề là nội dung của bài kiểm tra */}

              {/* Hiển thị thời gian hết hạn */}
              <p className="text-gray-500 text-sm mt-2">
                Thời gian hết hạn: {new Date(test.deadline).toLocaleString()}
              </p>

              {/* Các nút chức năng: Tạo câu hỏi, Chỉnh sửa, Xóa */}
              <div className="flex gap-2 mt-4">
                {/* Tạo câu hỏi cho bài kiểm tra */}
                <button
                  onClick={() => handleCreateQuestion(test.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Plus size={16} />
                  Tạo câu hỏi
                </button>

                {/* Chỉnh sửa bài kiểm tra */}
                <button
                  onClick={() => handleEditTest(test.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </button>

                {/* Xóa bài kiểm tra */}
                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <Trash size={16} />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có bài kiểm tra nào cho khóa học này.</p>
      )}
    </div>
  );
};

export default TestList;
