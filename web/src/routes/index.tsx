import { Home } from "#src/pages/home/home";
import { NotFound } from "#src/pages/notFound/notFound";
import { Redirect } from "#src/pages/redirect/redirect";
import { Routes, Route } from "react-router-dom";

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:code" element={<Redirect />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}
