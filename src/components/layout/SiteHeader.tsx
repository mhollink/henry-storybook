import { NavLink } from "react-router-dom";

const links = [
  { to: "/", title: "Home", end: true },
  { to: "/over-henry", title: "Over Henry", end: false },
  { to: "/verhalen", title: "Brieven & herinneringen", end: false },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand" aria-label="Henry Hollink, naar home">
          <span aria-hidden="true" className="brand__star">
            ✦
          </span>
          <span>
            Henry <span className="brand__surname">Hollink</span>
          </span>
        </NavLink>
        <nav aria-label="Hoofdnavigatie" className="site-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " is-active" : ""}`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
