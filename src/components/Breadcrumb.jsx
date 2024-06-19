import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="w-full h-full flex items-center gap-4">
      {crumbs?.length > 0 &&
        crumbs.map((crumb, index) => {
          return index === crumbs.length - 1 ? (
            <span key={index} className="text-red font-medium">
              {crumb.label}
            </span>
          ) : (
            <div key={index} className="flex items-center gap-2">
              {crumb.icon && crumb.icon}
              <NavLink to={crumb.path}>{crumb.label}</NavLink>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
