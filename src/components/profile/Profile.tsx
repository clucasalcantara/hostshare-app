import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";

export default function Profile() {
  return (
    <div className="invisible flex-row rounded-full shadow-md shadow-[rgba(0,0,0,.1)] py-2 border items-center px-4 gap-4 hidden lg:flex sm:visible">
      <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
        <RxHamburgerMenu color="gray" size={22} />
      </div>
      <RxAvatar color="gray" size={32} />
    </div>
  );
}
