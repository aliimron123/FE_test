import { Menu, ActionIcon } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";
import { useAuth } from "@/utils/hooks/useAuth";

export default function ProfileButton() {
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
    toast.success("Goodbye", { position: "top-center" });
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="default">
          <IconUser size={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser size={18} />}>Account</Menu.Item>
        <Menu.Item onClick={handleLogout} color="red" leftSection={<IconLogout size={18} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
