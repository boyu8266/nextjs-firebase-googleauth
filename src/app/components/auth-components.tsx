"use client";

import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <Button
      onClick={handleClick}
      leftSection={
        <Image src="/google.svg" alt="Google icon" width={20} height={20} />
      }
      variant="default"
      color="gray"
      fullWidth
      loading={loading}
    >
      Login with Google
    </Button>
  );
}

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="flex w-full items-center justify-center rounded-lg transition-colors cursor-pointer"
    >
      <Image
        src="/account_circle.svg"
        alt="Login icon"
        width={24}
        height={24}
      />
    </button>
  );
}

export function LogoutButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm Logout">
        <p>Are you sure you want to log out?</p>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={() => signOut()}>
            Logout
          </Button>
        </Group>
      </Modal>

      <button
        onClick={open}
        className="flex w-full items-center justify-center rounded-lg transition-colors cursor-pointer"
      >
        <Image src="/logout.svg" alt="Logout icon" width={24} height={24} />
      </button>
    </>
  );
}
