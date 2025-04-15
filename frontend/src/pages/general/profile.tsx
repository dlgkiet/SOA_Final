import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/layouts";

export default function ProfilePage() {
  const { _ui } = useAuthStore(useShallow((state) => state));

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
          <p className="text-sm text-gray-500 mb-6">
            Chỉnh sửa các thông tin cá nhân và tài khoản.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-1 gap-5 mb-6">
            <div>
              <Label className="block">Tên người dùng</Label>
              <Input className="mt-1" value={_ui?.name ?? ""} />
            </div>
            <div>
              <Label className="block">Email</Label>
              <Input className="mt-1" type="email" value={_ui?.email ?? ""} />
            </div>
            <div>
              <Label className="block">Ngày sinh</Label>
              <Input
                className="mt-1"
                type="date"
                value={_ui?.birthday ? new Date(_ui.birthday).toISOString().split("T")[0] : ""}
              />
            </div>
            <div>
              <Label className="block">Vai trò</Label>
              <Input className="mt-1" disabled value={_ui?.role ?? ""} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Hủy bỏ</Button>
            <Button className="bg-primary text-white">Lưu thay đổi</Button>
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label className="block">Mật khẩu hiện tại</Label>
                <Input className="mt-1" type="password" placeholder="********" />
              </div>
              <div>
                <Label className="block">Mật khẩu mới</Label>
                <Input className="mt-1" type="password" placeholder="********" />
              </div>
              <div>
                <Label className="block">Nhập lại mật khẩu</Label>
                <Input className="mt-1" type="password" placeholder="********" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Hủy bỏ</Button>
              <Button className="bg-primary text-white">Lưu thay đổi</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
