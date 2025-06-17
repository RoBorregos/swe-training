import Link from "next/link";
import logo from "../../../../public/images/Logo.png"
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-secondary text-center text-white pb-8 pt-4">
            <div className="flex flex-row items-center justify-center gap-4 text-sm">
                <Image src={logo} alt="Logo" className="h-[2rem] w-fit cursor-pointer object-contain" />
                <p>
                    &copy; {new Date().getFullYear()} RoBorregos.
                </p>
                <Link href="https://www.linkedin.com/company/roborregos" target="_blank" className="text-white hover:underline">
                    Linkedin
                </Link>
                <Link href="https://www.instagram.com/roborregos/" target="_blank" className="text-white hover:underline">
                    Instagram
                </Link>
                <Link href="https://github.com/RoBorregos" target="_blank" className="text-white hover:underline">
                    GitHub
                </Link>
            </div>
        </footer>
    );
}

export default Footer;