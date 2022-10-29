import { Link } from 'react-router-dom';
import { CameraTabs } from '../../const';
import { Camera } from '../../types/camera';

type Props = {
  camera: Camera;
  handleResetButtonClick: () => void;
}

export default function SearchItem({camera, handleResetButtonClick}: Props): JSX.Element {
  const handleLinkClick = () => handleResetButtonClick();

  return (
    <Link onClick={handleLinkClick} to={`/camera/${camera.id}/${CameraTabs.Review}`}>
      <li className="form-search__select-item" tabIndex={0}>{camera.name}</li>
    </Link>
  );
}
