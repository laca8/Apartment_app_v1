'use client';
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

type Props = {
    images: string[]
}

export const SliderImages = ({ images }: Props) => {
    if (!images || images.length === 0) return null;


    return (
        <div >
            <Carousel>
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index}>
                            <Image
                                src={img ? `${img}` : "https://u.realgeeks.media/lioninternationalrealty/lifestyle/miami-property-search_(2).jpg"}
                                alt={`img_${index}`}
                                width={500}
                                height={300}
                                className="object-cover group-hover:scale-105 transition-transform duration-300 w-100 h-100"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};