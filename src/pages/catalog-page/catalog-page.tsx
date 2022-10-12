import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-reducer/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Pagination from '../../components/pagination/pagination';
import CardList from '../../components/card-list/card-list';
import Sortings from '../../components/sortings/sortings';
import Filters from '../../components/filters/filters';
import { AppRoute, getPaginagionPageCount } from '../../const';

export default function CatalogPage(): JSX.Element {
  const {number = 1} = useParams();
  const navigate = useNavigate();
  const cameras = useAppSelector(getCameras);
  const pageCount = getPaginagionPageCount(cameras.length);
  const pages = Array.from({length: pageCount}, (_, i) => i + 1);

  useEffect(() => {
    if(cameras.length) {
      if(!pages.some((item) => Number(number) === item)) {
        navigate(AppRoute.NotFound);
      }
    }
  }, [navigate, number, pageCount, pages, cameras]);


  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs pageName='catalogPage' />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filters />
                </div>
                <div className="catalog__content">
                  <Sortings />
                  <CardList pageNumber={Number(number)} />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
