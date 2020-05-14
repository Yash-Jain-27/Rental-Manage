import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ImageGallery extends Component {

    static propTypes = {
        breadCrumbs: PropTypes.array,
        categories: PropTypes.array,
        onCategoryClick: PropTypes.func,
        pathPrefix: PropTypes.string
    }

    handleSubCategories(category) {
        this.props.onCategoryClick(category)
    }

    handleError(category) {
        this.setState({ [category.name]: true })
    }

    render() {
        const { categories, pathPrefix, breadCrumbs } = this.props

        return [
            <div className="breadCrumbs" key="breadCrumbs">{breadCrumbs.join(' / ')}</div>,
            <div className="imageContainer" key="imageContainer">
                {categories.map((category) => {
                    let imageSrc = null

                    try {
                        imageSrc = require(`../../images/${pathPrefix}/${category.image}`)
                    } catch (error) {
                        imageSrc = require('../../images/image-not-found.png')
                    }

                    return <div className="imageCard" key={category.name + 'Card'}>
                        <div>
                            <img
                                alt={category.name}
                                className="image"
                                key={category.name}
                                src={imageSrc}
                                onClick={this.handleSubCategories.bind(this, category)}
                                onError={this.handleError.bind(this, category)}
                                width="inherit"
                            />
                        </div>
                        <div className="imageButton">
                            {category.name}
                        </div>
                    </div>
                })}
            </div>
        ]
    }
}
