import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

export default function FeaturedCollections() {
    const {
        data: { collections },
    } = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
    });

    return (
        <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
            <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
                Collections
            </h2>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
                {collections.edges.map((collection) => {
                    return (
                        <Link key={collection.node.id} to={`/collections/${collection.node.handle}`}>
                            <div className="grid gap-4">
                                {collection?.node.image && (
                                    <Image
                                        className="rounded shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover"
                                        width={"100%"}
                                        height={336}
                                        alt={`Image of ${collection.node.title}`}
                                        data={collection.node.image}
                                    />
                                )}
                                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                                    {collection.node.title}
                                </h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

const QUERY = gql`
  query FeaturedCollections {
    collections(first: 3) {
        edges{
      node {
        id
        title
        handle
        image {
            altText
            width
            height
            url
          }
      }
    }
    }
  }
`;
