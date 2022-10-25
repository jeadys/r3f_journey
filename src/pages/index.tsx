import type { NextPage } from "next";
import Link from "next/link";
import Chapter from "./components/Chapter";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-row gap-5 flex-wrap text-white">
      <ul>
        <Chapter chapter="Chapter 1" />
        <li>
          <Link href="#">
            <a>01 - ...</a>
          </Link>
        </li>
        <li>
          <Link href="/6-animation">
            <a>06 - Animation</a>
          </Link>
        </li>
        <li>
          <Link href="/10-debug">
            <a>10 - Debug</a>
          </Link>
        </li>
        <li>
          <Link href="/11-textures">
            <a>11 - Textures</a>
          </Link>
        </li>
        <li>
          <Link href="/12-materials">
            <a>12 - Materials</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 2" />
        <li>
          <Link href="/15-lights">
            <a>15 - Lights</a>
          </Link>
        </li>
        <li>
          <Link href="/16-shadows">
            <a>16 - Shadows</a>
          </Link>
        </li>
        <li>
          <Link href="/18-particles">
            <a>18 - Particles</a>
          </Link>
        </li>
        <li>
          <Link href="/19-galaxy">
            <a>19 - Galaxy</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 3" />
        <li>
          <Link href="/22-physics">
            <a>22 - Physics</a>
          </Link>
        </li>
        <li>
          <Link href="/23-models">
            <a>22 - Models</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 4" />
        <li>
          <Link href="/27-shaders">
            <a>27 - Shaders</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 5" />
        <li>
          <Link href="#">
            <a>32 - ...</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
