interface ItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  function ItemCard({ item }: { item: ItemProps }) {
    return (
      <div className="item-card">
        <img src={item.imageUrl} alt={item.name} className="item-card__image" />
        <h2 className="item-card__title">{item.name}</h2>
        <p className="item-card__description">{item.description}</p>
        <p className="item-card__price">₹{item.price.toFixed(2)}</p>
      </div>
    );
  }
  
  export default ItemCard;