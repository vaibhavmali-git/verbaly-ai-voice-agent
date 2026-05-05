"use client"
import Image from "next/image";
import { Button } from "@/components/ui/custom/button";


const footerLang = [
    { label: "English", src: "/images/langs/english.png" },
    { label: "Spanish", src: "/images/langs/spanish.png" },
    { label: "French", src: "/images/langs/french.png" },
    { label: "German", src: "/images/langs/german.png" },
    { label: "Italian", src: "/images/langs/italian.png" },
    { label: "Portuguese", src: "/images/langs/portuguese.png" },
];

const Footer = () => {
    return (
        <footer className='hidden lg:block w-full border-t-2 border-border p-2'>
            <ul className='w-full max-w-5xl flex items-center justify-evenly'>
                {footerLang.map((item) => (
                    <li key={item.label} className='w-full'>
                        <Button size="lg" variant="ghost" className="w-full cursor-default text-muted-foreground">
                            <Image
                                src={item.src}
                                alt={item.label}
                                height={32}
                                width={40}
                                className="mr-4 rounded-md" />
                                {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer