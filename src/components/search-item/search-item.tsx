import { Link } from 'react-router-dom';
import { CameraTabs } from '../../const';
import { Camera } from '../../types/camera';

type Props = {
  camera: Camera;
  onResetSearch: () => void;
}

export default function SearchItem({camera, onResetSearch}: Props): JSX.Element {
  return (
    <Link onClick={onResetSearch} to={`/camera/${camera.id}/${CameraTabs.Review}`} tabIndex={0}>
      <li className="form-search__select-item">{camera.name}</li>
    </Link>
  );
}
