import {
    ProductOptionsProvider,
    MediaFile,
    useProductOptions,
    ProductPrice,
    BuyNowButton,
    AddToCartButton,
} from "@shopify/hydrogen";

export default function ProductDetails({ product }) {
    return (
        <ProductOptionsProvider data={product}>
            <section className="productDetailSection">
                <div className="flex content-between">
                    <div className="galleryWrapper">
                        <div className="w-100">
                            <ProductGallery media={product.media.nodes} />
                        </div>
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
                        {/* <div className="">
                            <div
                                className=""
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            ></div>
                        </div> */}
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
            {/* {isOutOfStock ? (
                <span className="">
                    Available in 2-3 weeks
                </span>
            ) : (
                <BuyNowButton variantId={selectedVariant.id}>
                    <span className="">
                        Buy it now
                    </span>
                </BuyNowButton>
            )} */}
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
    if (!media.length) {
        return null;
    }

    return (
        <div
        // className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}
        >
            {media.map((med, i) => {
                let extraProps = {};

                const data = {
                    ...med,
                    image: {
                        ...med.image,
                        altText: med.alt || "Product image",
                        id: med.id,
                    },
                };

                return (
                    <div
                        // className=
                        // {`${i % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
                        //     } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
                        key={med.id || med.image.id}
                    >
                        <MediaFile
                            tabIndex="0"
                            // className={`w-full h-full aspect-square object-cover`}
                            data={data}
                            options={{
                                crop: "center",
                            }}
                            {...extraProps}
                        />
                    </div>
                );
            })}
        </div>
    );
}
