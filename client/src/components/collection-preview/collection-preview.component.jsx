import React from "react";

import CollectionItem from '../collection-item/collection-item.component'

import "./collection-preview.styles.scss";

const CollectionPreview = ({title, items, id}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items
                    .filter((item, idx) => idx < 4 )  // this will return only items with idx less than 4

                    // so here we are passing the Whole item
                    .map(item => {

                        // so now we passed the Whole item to "item" props
                        return (
                            <CollectionItem key={item.id} item={item} />
                        )
                })
            }
        </div>
    </div>
)

export default CollectionPreview