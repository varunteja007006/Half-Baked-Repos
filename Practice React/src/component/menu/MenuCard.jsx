function MenuCard({ item }) {
  const { id, title, category, price, img, desc } = { ...item };
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt={title} className="w-72 h-56" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
          <div className="badge badge-outline">{price}</div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
