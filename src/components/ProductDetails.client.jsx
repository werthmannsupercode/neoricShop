import {
    ProductOptionsProvider,
    useProductOptions,
    ProductPrice,
    AddToCartButton,
} from "@shopify/hydrogen";

import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Ribbon from '../assets/schleifenneoric.jpg';

// import { useState } from 'react';

export default function ProductDetails({ product }) {
    return (
        <ProductOptionsProvider data={product}>
            <section className="productDetailSection">
                <div className="flex">
                    <div className="galleryWrapper flex">
                        <ProductGallery media={product.media.nodes} />
                    </div>
                    <div className="detailsWrapper">
                        <div className="">
                            <h1 className="productTitle">
                                {product.title}
                            </h1>
                            <span className="productVendor">
                                {product.vendor}
                            </span>
                        </div>
                        <ProductForm product={product} />
                    </div>
                </div>
            </section>
            <section className="ribbonSection flex">
                <div className="flex">
                    <img src={Ribbon} alt="ribbon" />
                    <div>
                        <h3>100% Qualität</h3>
                        <p>Dank weichem Silikon</p>
                    </div>
                </div>
                <div className="flex">
                    <img src={Ribbon} alt="ribbon" />
                    <div>
                        <h3>100% Qualität</h3>
                        <p>Dank weichem Silikon</p>
                    </div>
                </div>
                <div className="flex">
                    <img src={Ribbon} alt="ribbon" />
                    <div>
                        <h3>100% Qualität</h3>
                        <p>Dank weichem Silikon</p>
                    </div>
                </div>
            </section>
        </ProductOptionsProvider>
    );
}

function ProductForm({ product }) {
    const { options, selectedVariant } = useProductOptions();

    return (
        <form className="">
            {
                <div className="">
                    {options.map(({ name, values }) => {
                        if (values.length === 1) {
                            return null;
                        }
                        return (
                            <div
                                key={name}
                                className=""
                            >
                                <legend className="">
                                    {name}
                                </legend>
                                <div className="">
                                    <OptionRadio name={name} values={values} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
            <div className="flex prices">
                <ProductPrice
                    className="originalPrice"
                    priceType="compareAt"
                    variantId={selectedVariant.id}
                    data={product}
                />
                <ProductPrice
                    className="actualPrice"
                    variantId={selectedVariant.id}
                    data={product}
                />
                <span className="mwst">inkl. MwSt.</span>
            </div>
            <div className="">
                <PurchaseMarkup />
            </div>
        </form>
    );
}

function PurchaseMarkup() {
    const { selectedVariant } = useProductOptions();
    const isOutOfStock = !selectedVariant?.availableForSale || false;

    return (
        <>
            <AddToCartButton
                type="button"
                variantId={selectedVariant.id}
                quantity={1}
                accessibleAddingToCartLabel="Adding item to your cart"
                disabled={isOutOfStock}
                className="toCartButton"
            >
                <span>
                    {isOutOfStock ? "Leider ausverkauft" : "In den Einkaufswagen"}
                </span>
            </AddToCartButton>
        </>
    );
}

function OptionRadio({ values, name }) {
    const { selectedOptions, setSelectedOption } = useProductOptions();

    return (
        <>
            {values.map((value) => {
                const checked = selectedOptions[name] === value;
                const id = `option-${name}-${value}`;

                return (
                    <label key={id} htmlFor={id}>
                        <input
                            className="sr-only"
                            type="radio"
                            id={id}
                            name={`option[${name}]`}
                            value={value}
                            checked={checked}
                            onChange={() => setSelectedOption(name, value)}
                        />
                        <div
                            className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${checked ? "border-gray-500" : "border-neutral-50"
                                }`}
                        >
                            {value}
                        </div>
                    </label>
                );
            })}
        </>
    );
}

function ProductGallery({ media }) {

    // const [thumbsSwiper, setThumbsSwiper] = useState();

    if (!media.length) {
        return null;
    }
    return (
        <>
            <Swiper
                modules={[Thumbs]}
                spaceBetween={15}
                slidesPerView={4}
                watchSlidesProgress
                // onSwiper={setThumbsSwiper}
                grabCursor={true}
                direction="vertical"
                className="thumbs"
            >
                {media.map((med) => {

                    const data = {
                        ...med,
                        image: {
                            ...med.image,
                            altText: med.alt || "Product image",
                            id: med.id,
                        },
                    };

                    return (
                        <SwiperSlide key={data.id}>
                            <img className="swiperImg" src={data.image.url} alt={data.image.altText} />
                        </SwiperSlide>
                    );
                })}
            </Swiper >
            <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={15}
                slidesPerView={"auto"}
                centeredSlides={true}
                navigation={true}
                grabCursor={true}
                pagination={{ clickable: true }}
                // thumbs={{ swiper: thumbsSwiper }}
                className="galleryLarge"
            >
                {media.map((med) => {

                    const data = {
                        ...med,
                        image: {
                            ...med.image,
                            altText: med.alt || "Product image",
                            id: med.id,
                        },
                    };

                    console.log(data);

                    return (
                        <SwiperSlide key={data.id}>
                            <img className="swiperImg" src={data.image.url} alt={data.image.altText} />
                        </SwiperSlide>
                    );
                })}
            </Swiper >
        </>
    );
}
