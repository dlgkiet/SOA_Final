import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "@/components/layouts";
import { updatePassword, updatePersonalInfo } from "@/api/auth";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ILoginData } from "@/types/global";

export default function Profile() {
  const { _ui } = useAuthStore(useShallow((state) => state));
  const userId = _ui?.userId ?? 0;

  // Dữ liệu gốc
  const initialProfile = {
    name: _ui?.name ?? "",
    email: _ui?.email ?? "",
    birthday: _ui?.birthday
      ? new Date(_ui.birthday).toISOString().split("T")[0]
      : "",
  };

  // State hiện tại
  const [profile, setProfile] = useState(initialProfile);

  // So sánh thay đổi thông tin cá nhân
  const isProfileChanged =
    profile.name !== initialProfile.name ||
    profile.email !== initialProfile.email ||
    profile.birthday !== initialProfile.birthday;

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordChanged =
    currentPassword !== "" || newPassword !== "" || confirmPassword !== "";

  const resetProfile = () => setProfile(initialProfile);
  const resetPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const { setUserInformation } = useAuthStore();

  const handleSaveProfile = async () => {
    try {
      const response = await updatePersonalInfo(userId, profile);

      console.log("API Response:", response);

      if (response && typeof response === "object") {
        // Chuyển đổi birthday từ string sang Date nếu có
        const updatedInfo: Partial<ILoginData> = {
          name: response.name,
          email: response.email,
        };

        // Chuyển đổi birthday từ chuỗi sang Date nếu nó tồn tại
        if (response.birthday) {
          updatedInfo.birthday = new Date(response.birthday);
        }

        // Cập nhật state với dữ liệu từ API
        setUserInformation(updatedInfo);

        // Cập nhật lại initialProfile
        setProfile({
          name: response.name || "",
          email: response.email || "",
          birthday: response.birthday
            ? new Date(response.birthday).toISOString().split("T")[0]
            : "",
        });

        toast.success("Cập nhật thông tin thành công!");
      } else {
        // Xử lý nếu API không trả về đối tượng
        const updatedInfo: Partial<ILoginData> = {
          name: profile.name,
          email: profile.email,
        };

        // Chuyển đổi birthday từ form thành Date
        if (profile.birthday) {
          updatedInfo.birthday = new Date(profile.birthday);
        }

        setUserInformation(updatedInfo);

        // Cập nhật initialProfile
        Object.assign(initialProfile, profile);

        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await updatePassword(userId, newPassword);
      toast.success("Đổi mật khẩu thành công!");
      resetPassword();
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!");
      console.error(error);
    }
  };

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
              <Input
                className="mt-1"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="block">Email</Label>
              <Input
                className="mt-1"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="block">Ngày sinh</Label>
              <Input
                className="mt-1"
                type="date"
                value={profile.birthday}
                onChange={(e) =>
                  setProfile({ ...profile, birthday: e.target.value })
                }
              />
            </div>
            <div>
              <Label className="block">Vai trò</Label>
              <Input className="mt-1" disabled value={_ui?.role ?? ""} />
            </div>
          </div>

          <AlertDialog>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                disabled={!isProfileChanged}
                onClick={resetProfile}
              >
                Hủy bỏ
              </Button>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-primary text-white"
                  disabled={!isProfileChanged}
                >
                  Lưu thay đổi
                </Button>
              </AlertDialogTrigger>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn lưu thay đổi?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Thao tác này sẽ cập nhật thông tin cá nhân của bạn.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleSaveProfile}>
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Separator className="my-8" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label className="block">Mật khẩu hiện tại</Label>
                <Input
                  className="mt-1"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <Label className="block">Mật khẩu mới</Label>
                <Input
                  className="mt-1"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label className="block">Nhập lại mật khẩu</Label>
                <Input
                  className="mt-1"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <AlertDialog>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  disabled={!isPasswordChanged}
                  onClick={resetPassword}
                >
                  Hủy bỏ
                </Button>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-primary text-white"
                    disabled={!isPasswordChanged}
                  >
                    Lưu thay đổi
                  </Button>
                </AlertDialogTrigger>
              </div>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Bạn có chắc muốn lưu thay đổi?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Thao tác này sẽ cập nhật mật khẩu của bạn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleChangePassword}>
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
