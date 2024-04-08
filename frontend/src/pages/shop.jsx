import Hero from "../components/hero/hero";
import Popular from "../components/popular/popular";
import Offer from "../components/offers/offer"
import NewCollections from "../components/newcollections/newcollection"
import NewsLetter from "../components/newsletter/newsletter";
function Shop(){
    return (
        <>
            <Hero/>
            <Popular/>
            <Offer/>
            <NewCollections/>
            <NewsLetter/>
        </>
    )
}

export default Shop;