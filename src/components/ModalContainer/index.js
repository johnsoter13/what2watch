import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {selectModalContent} from '../../state/modal/selectors';

const ModalContainer = () => {
  const modalContent = useSelector(selectModalContent);

  if (!modalContent) {
    return null;
  }

  return modalContent;
};

ModalContainer.propTypes = {
  modalContent: PropTypes.node,
};

ModalContainer.defaultProps = {
  modalContent: undefined,
};

export default ModalContainer;
