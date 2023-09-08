import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="w-full bg-tomato relative z-[1]">
      <div className="flex items-center container mx-auto ">
        <div className="flex w-4/12 gap-3 text-secondary">
          <a target="_blank" href="https://github.com/fahmiaf13">
            <Icon width={36} icon="bi:github" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/fahmi-achmad-fahrudin/">
            <Icon width={36} icon="bi:linkedin" />
          </a>
          <a target="_blank" href="https://fahmiaf.vercel.app/">
            <Icon width={36} icon="mdi:paper" />
          </a>
        </div>
        <div className="flex py-5 justify-center flex-col w-4/12">
          <div className="text-center  font-extrabold text-secondary">Developed by</div>
          <div className="text-center text-sm text-secondary">Fahmi Achmad Fahrudin</div>
        </div>
      </div>
    </footer>
  );
}
