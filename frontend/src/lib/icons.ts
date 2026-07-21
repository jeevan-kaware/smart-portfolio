import { FaJava, FaCode, FaAws } from "react-icons/fa";
import {
  SiSpringboot, SiSpring, SiHibernate, SiPostgresql, SiMysql, SiMongodb,
  SiRedis, SiDocker, SiGit, SiApachemaven, SiPostman,
  SiIntellijidea, SiReact, SiTypescript, SiTailwindcss, SiHtml5, SiApachekafka,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";

const map: Record<string, IconType> = {
  FaJava, FaCode, FaAws,
  SiSpringboot, SiSpring, SiHibernate, SiPostgresql, SiMysql, SiMongodb,
  SiRedis, SiDocker, SiGit, SiApachemaven, SiPostman,
  SiIntellijidea, SiReact, SiTypescript, SiTailwindcss, SiHtml5, SiApachekafka,
  TbApi,
  SiAmazon: FaAws,
};

export function getIcon(name: string): IconType {
  return map[name] ?? FaCode;
}