'use client';

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";

import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: string | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={loginModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}

export default UserMenu;
