import './category-item.styles.scss';

function CategoryItem({ category: {imageUrl, title}}) {

    return (
        <div className="category-container">
            <div
                className='background-image'
                style={{
                    background: `url(${imageUrl})`
                }}>
            </div>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default CategoryItem;