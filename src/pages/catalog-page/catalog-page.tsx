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
import { AppRoute, getPaginationPageCount, START_PAGE_COUNT } from '../../const';

export default function CatalogPage(): JSX.Element {
  const {page = START_PAGE_COUNT} = useParams();
  const navigate = useNavigate();
  const cameras = useAppSelector(getCameras);
  const pageCount = getPaginationPageCount(cameras.length);
  const pages = Array.from({length: pageCount}, (_, i) => i + START_PAGE_COUNT);

  useEffect(() => {
    if(cameras.length) {
      if(!pages.some((item) => Number(page) === item)) {
        navigate(AppRoute.NotFound);
      }
    }
  }, [navigate, page, pageCount, pages, cameras]);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs pageName='catalogPage' />
          <section className="catalog" data-testid="catalog-page">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filters />
                </div>
                <div className="catalog__content">
                  <Sortings page={page} />
                  <CardList pageNumber={Number(page)} />
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
