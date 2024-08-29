import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

const ProductFormLabel = (props) => {
    const text = props.textLabel || capitalize(props.name)
  return (
    <label htmlFor={props.name} className={props.customClassName ||"block text-sm font-medium text-gray-700 mb-1"}>
        {props.children || text}
    </label>
  )
}

ProductFormLabel.propTypes = {
    name: PropTypes.string.isRequired,
    textLabel: PropTypes.string,
    customClassName: PropTypes.string,
    children: PropTypes.element,
}

export default ProductFormLabel