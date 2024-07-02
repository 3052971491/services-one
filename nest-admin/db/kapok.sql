-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: service-one-dev
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
  `id` varchar(36) NOT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '标记记录是否被删除',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建人',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '更新人',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除人',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间',
  `type` int NOT NULL DEFAULT '2' COMMENT 'type 1-菜单/目录 2-tabs 3-按钮',
  `parentId` varchar(255) DEFAULT NULL,
  `name` varchar(30) NOT NULL COMMENT '菜单名称',
  `orderNum` int NOT NULL COMMENT '排序',
  `icon` varchar(128) DEFAULT NULL COMMENT '图标',
  `routePath` varchar(64) DEFAULT NULL COMMENT '路由地址',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态, 1-启用 0-禁用',
  `permission` varchar(128) DEFAULT NULL COMMENT '权限标识',
  `componentPath` varchar(256) DEFAULT NULL COMMENT '组件路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES ('07C9C6FB-D751-4042-BBBC-8AC35C45A106',0,'1','2024-03-12 02:17:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','编辑角色信息',8022,'','',1,'Page.Admin.Role.EditRoleInfo',''),('10950FED-3962-4A14-869A-652114226D2C',0,'1','2024-03-12 02:27:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','新增接口',8041,'','',1,'Page.Admin.Perm.AddPerm',''),('13B7B15E-6B37-4E8E-85EE-13B8C49D8273',0,'1','2024-03-11 02:48:00','1','2024-03-11 11:01:00','',NULL,2,'C360BB8B-5B36-4D4D-8C14-7CEB986A0776','工作台',1020,'','/dashboard/workbench',1,'Page.Dashboard.Workbench','/dashboard/workbench/index'),('36C78982-2A48-4E04-88AB-87FE9F7FEC7E',0,'1','2024-03-11 02:56:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','账号管理',8010,'','/admin/account',1,'Page.Admin.Account','/admin/account/index'),('3AF77461-59A4-48DE-925C-E8EEE286AC83',0,'1','2024-03-12 02:25:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','新增菜单',8031,'','',1,'Page.Admin.Menu.AddMenu',''),('4541C865-9AED-4963-93BD-A6C4A6DB29EE',0,'1','2024-03-12 02:09:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','重置密码',8013,'','',1,'Page.Admin.Account.ResetPassword',''),('4F6DA063-629D-4EA1-9258-BB78D092069F',0,'1','2024-03-12 02:28:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','删除接口',8043,'','',1,'Page.Admin.Perm.DeletePerm',''),('6881446D-A38D-4789-85C4-E383D35A83AB',0,'1','2024-03-12 02:26:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','删除菜单',8033,'','',1,'Page.Admin.Menu.DeleteMenu',''),('71739849-F953-449D-A8BD-C44B82007DF8',0,'1','2024-03-11 02:45:00','1','2024-03-11 11:02:00','',NULL,2,'C360BB8B-5B36-4D4D-8C14-7CEB986A0776','分析页',1010,'','/dashboard/analysis',1,'Page.Dashboard.Analysis','/dashboard/analysis/index'),('7BA4105B-55BB-41A7-A7E3-12DD8278C0C3',0,'1','2024-03-11 02:52:00','1','2024-03-11 10:59:00','',NULL,1,'','系统管理',9000,'ant-design:setting-outlined','/system',1,'',''),('7DBF098E-4A9B-441E-8D11-7E98BDDE17B6',0,'1','2024-03-12 02:19:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','删除此角色',8024,'','',1,'Page.Admin.Role.DeleteRole',''),('863A2655-C470-4A0E-88E5-83E0F5969069',0,'1','2024-03-11 02:58:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','接口管理',8040,'','/admin/perm',1,'Page.Admin.Perm','/admin/perm/index'),('B1A43353-776B-4E4C-98F0-D96F51FF0FEC',0,'1','2024-03-12 02:27:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','编辑接口',8042,'','',1,'Page.Admin.Perm.EditPerm',''),('B3AFE1CF-8109-4902-8C20-5A976A83F676',0,'1','2024-03-12 02:08:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','新增账号',8011,'','',1,'Page.Admin.Account.AddAccount',''),('B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79',0,'1','2024-03-11 02:57:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','角色管理',8020,'','/admin/role',1,'Page.Admin.Role','/admin/role/index'),('C360BB8B-5B36-4D4D-8C14-7CEB986A0776',0,'1','2024-03-11 02:44:00','1','2024-03-11 11:01:00','',NULL,1,'','Dashboard',1000,'ant-design:appstore-outlined','/dashboard',1,'',''),('C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44',0,'1','2024-03-11 02:57:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','菜单管理',8030,'','/admin/menu',1,'Page.Admin.Menu','/admin/menu/index'),('CD9F79A9-1B7D-4BCE-A5BB-155C95D05A32',0,'1','2024-03-12 02:10:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','编辑用户资料',8014,'','',1,'Page.Admin.Account.EditUserProfile',''),('D6F2BA5D-E511-403D-AE1B-2B2974403469',0,'1','2024-03-12 02:16:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','新增角色',8021,'','',1,'Page.Admin.Role.AddRole',''),('DC78A241-A65E-4DAA-870C-F6672BE83F87',0,'1','2024-03-12 02:11:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','删除此账号',8015,'','',1,'Page.Admin.Account.DeleteAccount',''),('E05502FF-A3C5-4624-84B6-9D279B6D65BF',0,'1','2024-03-11 02:56:00','1','2024-03-11 10:59:00','',NULL,1,'','系统权限',8000,'ant-design:code-sandbox-outlined','/admin',1,'',''),('F90AF102-5657-48E2-A3A8-E9CC2F7090E6',0,'1','2024-03-11 02:53:00','1','2024-03-12 09:22:00','',NULL,2,'7BA4105B-55BB-41A7-A7E3-12DD8278C0C3','文件管理',9010,'','/system/file',1,'Page.System.File','/system/file/index'),('F910C13B-0AA4-4DB0-9A62-F75606AE948A',0,'1','2024-03-12 02:25:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','编辑菜单',8032,'','',1,'Page.Admin.Menu.EditMenu',''),('FF210253-E8C9-452C-8600-268E916E3AA3',0,'1','2024-03-12 01:22:00','',NULL,'',NULL,3,'F90AF102-5657-48E2-A3A8-E9CC2F7090E6','新增文件',9011,'','',1,'Page.System.File.AddFile','');
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu_roles_sys_role`
--

DROP TABLE IF EXISTS `sys_menu_roles_sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu_roles_sys_role` (
  `sysMenuId` varchar(36) NOT NULL,
  `sysRoleId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysMenuId`,`sysRoleId`),
  KEY `IDX_f75ba8403bd2d4ddf5d7f9b20c` (`sysMenuId`),
  KEY `IDX_3edb482216d3e42b928a547081` (`sysRoleId`),
  CONSTRAINT `FK_3edb482216d3e42b928a5470813` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f75ba8403bd2d4ddf5d7f9b20c1` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu_roles_sys_role`
--

LOCK TABLES `sys_menu_roles_sys_role` WRITE;
/*!40000 ALTER TABLE `sys_menu_roles_sys_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_menu_roles_sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_oss`
--

DROP TABLE IF EXISTS `sys_oss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_oss` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(255) NOT NULL COMMENT '上传用户id',
  `user_account` varchar(32) NOT NULL COMMENT '上传用户帐号',
  `url` varchar(255) NOT NULL COMMENT '文件 url',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '文件名称',
  `size` int NOT NULL COMMENT '文件size',
  `type` varchar(255) NOT NULL COMMENT '文件mimetype类型',
  `remark` varchar(200) NOT NULL COMMENT '业务描述字段，可以字符串，也可以是 JSON 字符串',
  `location` varchar(200) NOT NULL COMMENT '文件存放位置',
  `create_date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_oss`
--

LOCK TABLES `sys_oss` WRITE;
/*!40000 ALTER TABLE `sys_oss` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_oss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_perm`
--

DROP TABLE IF EXISTS `sys_perm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_perm` (
  `id` varchar(36) NOT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '标记记录是否被删除',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建人',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '更新人',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除人',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间',
  `type` int NOT NULL DEFAULT '1' COMMENT 'type 1-组 2-接口',
  `parent_id` varchar(255) DEFAULT NULL,
  `name` varchar(30) NOT NULL COMMENT '名称',
  `method` varchar(255) DEFAULT NULL COMMENT '路由方法',
  `path` varchar(100) DEFAULT NULL COMMENT 'api 路径',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_perm`
--

LOCK TABLES `sys_perm` WRITE;
/*!40000 ALTER TABLE `sys_perm` DISABLE KEYS */;
INSERT INTO `sys_perm` VALUES ('0231f717-ba49-418f-a7f7-5b769b6a2dd5',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:42:38',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','新增账号','POST','/v1/api/user',''),('041c2b44-7c69-4865-8d2f-0c4cd34c53ef',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:47:27',NULL,NULL,NULL,NULL,1,'9cdaa8eb-ce20-4f0d-b637-d05de57529d3','新增','POST','/v1/api/oss',''),('0a7f9f83-034e-448b-9f15-5ab920665e3a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:42:14',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','根据用户ID获取所有菜单','GET','/v1/api/user/menus',''),('0bee9a84-0862-4f99-8a77-de368ea6c29c',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:43:55',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','重置用户密码','PUT','/v1/api/user/password/reset',''),('11cb750b-17ea-400b-a032-1b7ebb5aa747',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:39:38',NULL,NULL,NULL,NULL,0,NULL,'角色管理',NULL,NULL,''),('14e845b7-6675-48bd-b848-c20c0fe26ab3',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:45:00',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','删除角色','DELETE','/v1/api/role',''),('25392c39-c929-48a9-af2a-bc3a43bfe53e',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:39:48',NULL,NULL,NULL,NULL,0,NULL,'接口管理',NULL,NULL,''),('308f22cd-496e-4200-90a7-444e446f619a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:46:37',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','新增接口','POST','/v1/api/perm',''),('3bc38b04-3117-4718-895e-dcf35645a3da',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:45:18',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','获取所有菜单','GET','/v1/api/menu/all',''),('3c96b61f-2edb-4fb4-8d49-dbf4915acc02',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:47:01',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','删除接口','DELETE','/v1/api/perm',''),('45df6176-5f24-4da9-830e-82033df9e171',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:43:40',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','查询账号列表','GET','/v1/api/user/list',''),('5ea30c64-8058-4723-8637-91ca330ae34a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:39:43',NULL,NULL,NULL,NULL,0,NULL,'菜单管理',NULL,NULL,''),('9cdaa8eb-ce20-4f0d-b637-d05de57529d3',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:39:53',NULL,NULL,NULL,NULL,0,NULL,'文件管理',NULL,NULL,''),('a15656ed-a402-4958-9794-0126d4ab97b4',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:44:48',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','修改角色','PUT','/v1/api/role',''),('a99f9cbf-6908-4083-ab34-56b73aa1f324',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:43:11',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','删除账号','DELETE','/v1/api/user',''),('aecb5cf7-67f3-4000-a78a-81501741a959',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:46:04',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','删除菜单','DELETE','/v1/api/menu',''),('b248e429-0616-4c6c-8eb6-885938fec596',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:45:52',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','修改菜单','PUT','/v1/api/menu',''),('be467df5-518e-491f-a463-75bea28317f8',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:46:24',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','获取接口列表','GET','/v1/api/perm',''),('c7f6c774-615c-4bc4-8e5b-fddf2600bb8c',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:44:19',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','获取角色列表','GET','/v1/api/role/list',''),('d8020802-f237-48a8-ad7a-6b94122fb9b0',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:39:12',NULL,NULL,NULL,NULL,0,NULL,'账号管理',NULL,NULL,''),('e915c9a6-3130-4dd9-af15-ff499ebad644',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:46:50',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','修改接口','PUT','/v1/api/perm',''),('f54a9220-872e-490a-bbec-ff5d50382641',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:44:32',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','新增角色','POST','/v1/api/role',''),('f5de5b00-2d5e-4a1f-9695-411128d67c15',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:42:55',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','修改账号','PUT','/v1/api/user',''),('ff392faa-05f2-4ea8-9626-2788773da77e',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:47:16',NULL,NULL,NULL,NULL,1,'9cdaa8eb-ce20-4f0d-b637-d05de57529d3','查询列表','GET','/v1/api/oss',''),('ff5942a8-718b-4a31-9578-4d22e74b131b',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 08:45:39',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','新增菜单','POST','/v1/api/menu','');
/*!40000 ALTER TABLE `sys_perm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_perm_roles_sys_role`
--

DROP TABLE IF EXISTS `sys_perm_roles_sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_perm_roles_sys_role` (
  `sysPermId` varchar(36) NOT NULL,
  `sysRoleId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysPermId`,`sysRoleId`),
  KEY `IDX_4ee06682e896afcd9d702ec1b1` (`sysPermId`),
  KEY `IDX_933556f16e04299de0f62c7f06` (`sysRoleId`),
  CONSTRAINT `FK_4ee06682e896afcd9d702ec1b11` FOREIGN KEY (`sysPermId`) REFERENCES `sys_perm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_933556f16e04299de0f62c7f066` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_perm_roles_sys_role`
--

LOCK TABLES `sys_perm_roles_sys_role` WRITE;
/*!40000 ALTER TABLE `sys_perm_roles_sys_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_perm_roles_sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
  `id` varchar(36) NOT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '标记记录是否被删除',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建人',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '更新人',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除人',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间',
  `name` varchar(100) NOT NULL COMMENT '角色名称',
  `value` varchar(100) NOT NULL COMMENT '角色值',
  `isSystem` tinyint NOT NULL DEFAULT '1' COMMENT '帐号类型: 0-超管， 1-普通用户',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '角色备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_apis_sys_perm`
--

DROP TABLE IF EXISTS `sys_role_apis_sys_perm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_apis_sys_perm` (
  `sysRoleId` varchar(36) NOT NULL,
  `sysPermId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysRoleId`,`sysPermId`),
  KEY `IDX_412efa556985e43ded129cb360` (`sysRoleId`),
  KEY `IDX_85d2bd6be5a979fc176f215ad5` (`sysPermId`),
  CONSTRAINT `FK_412efa556985e43ded129cb360a` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_85d2bd6be5a979fc176f215ad57` FOREIGN KEY (`sysPermId`) REFERENCES `sys_perm` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_apis_sys_perm`
--

LOCK TABLES `sys_role_apis_sys_perm` WRITE;
/*!40000 ALTER TABLE `sys_role_apis_sys_perm` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_role_apis_sys_perm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menus_sys_menu`
--

DROP TABLE IF EXISTS `sys_role_menus_sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menus_sys_menu` (
  `sysRoleId` varchar(36) NOT NULL,
  `sysMenuId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysRoleId`,`sysMenuId`),
  KEY `IDX_e7c90b5f1eae0da649c74cfbcb` (`sysRoleId`),
  KEY `IDX_c6e4b76cb3f4ab1028f2461963` (`sysMenuId`),
  CONSTRAINT `FK_c6e4b76cb3f4ab1028f24619635` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`),
  CONSTRAINT `FK_e7c90b5f1eae0da649c74cfbcb4` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menus_sys_menu`
--

LOCK TABLES `sys_role_menus_sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menus_sys_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_role_menus_sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_users_sys_user`
--

DROP TABLE IF EXISTS `sys_role_users_sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_users_sys_user` (
  `sysRoleId` varchar(36) NOT NULL,
  `sysUserId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysRoleId`,`sysUserId`),
  KEY `IDX_078248127df3c83384539166a5` (`sysRoleId`),
  KEY `IDX_d95ac4e08b595d2c04be4f852c` (`sysUserId`),
  CONSTRAINT `FK_078248127df3c83384539166a50` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d95ac4e08b595d2c04be4f852cd` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_users_sys_user`
--

LOCK TABLES `sys_role_users_sys_user` WRITE;
/*!40000 ALTER TABLE `sys_role_users_sys_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_role_users_sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `id` varchar(36) NOT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '标记记录是否被删除',
  `createdBy` varchar(255) DEFAULT NULL COMMENT '创建人',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedBy` varchar(255) DEFAULT NULL COMMENT '更新人',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  `deletedBy` varchar(255) DEFAULT NULL COMMENT '删除人',
  `deletedAt` datetime DEFAULT NULL COMMENT '删除时间',
  `password` varchar(200) NOT NULL COMMENT '用户登录密码',
  `salt` varchar(200) NOT NULL COMMENT '盐',
  `account` varchar(32) NOT NULL COMMENT '用户登录账号',
  `phone_num` varchar(20) NOT NULL DEFAULT '' COMMENT '用户手机号码',
  `email` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '所属状态: 1-有效: 0-禁用',
  `nickname` varchar(32) NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像地址',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '用户备注',
  `isSystem` tinyint NOT NULL DEFAULT '1' COMMENT '帐号类型: 0-超管， 1-普通用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES ('ee39dc66-e74e-435e-8af9-5a10680e64ba',0,NULL,'2024-07-02 08:03:55',NULL,NULL,NULL,NULL,'$2a$10$THKoxD8oMSeMOGEx4NQduOKkYoB.O8hykEegDe1VUftjNPAtUcHdO','$2a$10$THKoxD8oMSeMOGEx4NQduO','admin','15173886750','',1,'Super_Admin','','',0);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_roles_sys_role`
--

DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_roles_sys_role` (
  `sysUserId` varchar(36) NOT NULL,
  `sysRoleId` varchar(36) NOT NULL,
  PRIMARY KEY (`sysUserId`,`sysRoleId`),
  KEY `IDX_d1daac450217c1a1e384e99254` (`sysUserId`),
  KEY `IDX_45602f09af1715f5532db91a43` (`sysRoleId`),
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_roles_sys_role`
--

LOCK TABLES `sys_user_roles_sys_role` WRITE;
/*!40000 ALTER TABLE `sys_user_roles_sys_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_user_roles_sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'service-one-dev'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-02 17:03:57

INSERT INTO `service-one-dev`.sys_menu (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parentId,name,orderNum,icon,routePath,status,permission,componentPath) VALUES
	 ('07C9C6FB-D751-4042-BBBC-8AC35C45A106',0,'1','2024-03-12 10:17:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','编辑角色信息',8022,'','',1,'Page.Admin.Role.EditRoleInfo',''),
	 ('10950FED-3962-4A14-869A-652114226D2C',0,'1','2024-03-12 10:27:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','新增接口',8041,'','',1,'Page.Admin.Perm.AddPerm',''),
	 ('13B7B15E-6B37-4E8E-85EE-13B8C49D8273',0,'1','2024-03-11 10:48:00','1','2024-03-11 11:01:00','',NULL,2,'C360BB8B-5B36-4D4D-8C14-7CEB986A0776','工作台',1020,'','/dashboard/workbench',1,'Page.Dashboard.Workbench','/dashboard/workbench/index'),
	 ('36C78982-2A48-4E04-88AB-87FE9F7FEC7E',0,'1','2024-03-11 10:56:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','账号管理',8010,'','/admin/account',1,'Page.Admin.Account','/admin/account/index'),
	 ('3AF77461-59A4-48DE-925C-E8EEE286AC83',0,'1','2024-03-12 10:25:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','新增菜单',8031,'','',1,'Page.Admin.Menu.AddMenu',''),
	 ('4541C865-9AED-4963-93BD-A6C4A6DB29EE',0,'1','2024-03-12 10:09:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','重置密码',8013,'','',1,'Page.Admin.Account.ResetPassword',''),
	 ('4F6DA063-629D-4EA1-9258-BB78D092069F',0,'1','2024-03-12 10:28:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','删除接口',8043,'','',1,'Page.Admin.Perm.DeletePerm',''),
	 ('6881446D-A38D-4789-85C4-E383D35A83AB',0,'1','2024-03-12 10:26:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','删除菜单',8033,'','',1,'Page.Admin.Menu.DeleteMenu',''),
	 ('71739849-F953-449D-A8BD-C44B82007DF8',0,'1','2024-03-11 10:45:00','1','2024-03-11 11:02:00','',NULL,2,'C360BB8B-5B36-4D4D-8C14-7CEB986A0776','分析页',1010,'','/dashboard/analysis',1,'Page.Dashboard.Analysis','/dashboard/analysis/index'),
	 ('7BA4105B-55BB-41A7-A7E3-12DD8278C0C3',0,'1','2024-03-11 10:52:00','1','2024-03-11 10:59:00','',NULL,1,'','系统管理',9000,'ant-design:setting-outlined','/system',1,'','');
INSERT INTO `service-one-dev`.sys_menu (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parentId,name,orderNum,icon,routePath,status,permission,componentPath) VALUES
	 ('7DBF098E-4A9B-441E-8D11-7E98BDDE17B6',0,'1','2024-03-12 10:19:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','删除此角色',8024,'','',1,'Page.Admin.Role.DeleteRole',''),
	 ('863A2655-C470-4A0E-88E5-83E0F5969069',0,'1','2024-03-11 10:58:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','接口管理',8040,'','/admin/perm',1,'Page.Admin.Perm','/admin/perm/index'),
	 ('B1A43353-776B-4E4C-98F0-D96F51FF0FEC',0,'1','2024-03-12 10:27:00','',NULL,'',NULL,3,'863A2655-C470-4A0E-88E5-83E0F5969069','编辑接口',8042,'','',1,'Page.Admin.Perm.EditPerm',''),
	 ('B3AFE1CF-8109-4902-8C20-5A976A83F676',0,'1','2024-03-12 10:08:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','新增账号',8011,'','',1,'Page.Admin.Account.AddAccount',''),
	 ('B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79',0,'1','2024-03-11 10:57:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','角色管理',8020,'','/admin/role',1,'Page.Admin.Role','/admin/role/index'),
	 ('C360BB8B-5B36-4D4D-8C14-7CEB986A0776',0,'1','2024-03-11 10:44:00','1','2024-03-11 11:01:00','',NULL,1,'','Dashboard',1000,'ant-design:appstore-outlined','/dashboard',1,'',''),
	 ('C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44',0,'1','2024-03-11 10:57:00','1','2024-03-11 11:00:00','',NULL,2,'E05502FF-A3C5-4624-84B6-9D279B6D65BF','菜单管理',8030,'','/admin/menu',1,'Page.Admin.Menu','/admin/menu/index'),
	 ('CD9F79A9-1B7D-4BCE-A5BB-155C95D05A32',0,'1','2024-03-12 10:10:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','编辑用户资料',8014,'','',1,'Page.Admin.Account.EditUserProfile',''),
	 ('D6F2BA5D-E511-403D-AE1B-2B2974403469',0,'1','2024-03-12 10:16:00','',NULL,'',NULL,3,'B9E2A6B7-BEE8-4BD9-B18B-0BD04F1FFB79','新增角色',8021,'','',1,'Page.Admin.Role.AddRole',''),
	 ('DC78A241-A65E-4DAA-870C-F6672BE83F87',0,'1','2024-03-12 10:11:00','',NULL,'',NULL,3,'36C78982-2A48-4E04-88AB-87FE9F7FEC7E','删除此账号',8015,'','',1,'Page.Admin.Account.DeleteAccount','');
INSERT INTO `service-one-dev`.sys_menu (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parentId,name,orderNum,icon,routePath,status,permission,componentPath) VALUES
	 ('E05502FF-A3C5-4624-84B6-9D279B6D65BF',0,'1','2024-03-11 10:56:00','1','2024-03-11 10:59:00','',NULL,1,'','系统权限',8000,'ant-design:code-sandbox-outlined','/admin',1,'',''),
	 ('F90AF102-5657-48E2-A3A8-E9CC2F7090E6',0,'1','2024-03-11 10:53:00','1','2024-03-12 09:22:00','',NULL,2,'7BA4105B-55BB-41A7-A7E3-12DD8278C0C3','文件管理',9010,'','/system/file',1,'Page.System.File','/system/file/index'),
	 ('F910C13B-0AA4-4DB0-9A62-F75606AE948A',0,'1','2024-03-12 10:25:00','',NULL,'',NULL,3,'C4E0AA87-FC2D-4A43-842F-5B4C8D49BA44','编辑菜单',8032,'','',1,'Page.Admin.Menu.EditMenu',''),
	 ('FF210253-E8C9-452C-8600-268E916E3AA3',0,'1','2024-03-12 09:22:00','',NULL,'',NULL,3,'F90AF102-5657-48E2-A3A8-E9CC2F7090E6','新增文件',9011,'','',1,'Page.System.File.AddFile','');



INSERT INTO `service-one-dev`.sys_perm (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parent_id,name,`method`,`path`,remark) VALUES
	 ('0231f717-ba49-418f-a7f7-5b769b6a2dd5',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:42:38',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','新增账号','POST','/v1/api/user',''),
	 ('041c2b44-7c69-4865-8d2f-0c4cd34c53ef',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:47:27',NULL,NULL,NULL,NULL,1,'9cdaa8eb-ce20-4f0d-b637-d05de57529d3','新增','POST','/v1/api/oss',''),
	 ('0a7f9f83-034e-448b-9f15-5ab920665e3a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:42:14',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','根据用户ID获取所有菜单','GET','/v1/api/user/menus',''),
	 ('0bee9a84-0862-4f99-8a77-de368ea6c29c',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:43:55',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','重置用户密码','PUT','/v1/api/user/password/reset',''),
	 ('11cb750b-17ea-400b-a032-1b7ebb5aa747',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:39:38',NULL,NULL,NULL,NULL,0,NULL,'角色管理',NULL,NULL,''),
	 ('14e845b7-6675-48bd-b848-c20c0fe26ab3',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:45:00',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','删除角色','DELETE','/v1/api/role',''),
	 ('25392c39-c929-48a9-af2a-bc3a43bfe53e',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:39:48',NULL,NULL,NULL,NULL,0,NULL,'接口管理',NULL,NULL,''),
	 ('308f22cd-496e-4200-90a7-444e446f619a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:46:37',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','新增接口','POST','/v1/api/perm',''),
	 ('3bc38b04-3117-4718-895e-dcf35645a3da',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:45:18',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','获取所有菜单','GET','/v1/api/menu/all',''),
	 ('3c96b61f-2edb-4fb4-8d49-dbf4915acc02',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:47:01',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','删除接口','DELETE','/v1/api/perm','');
INSERT INTO `service-one-dev`.sys_perm (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parent_id,name,`method`,`path`,remark) VALUES
	 ('45df6176-5f24-4da9-830e-82033df9e171',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:43:40',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','查询账号列表','GET','/v1/api/user/list',''),
	 ('5ea30c64-8058-4723-8637-91ca330ae34a',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:39:43',NULL,NULL,NULL,NULL,0,NULL,'菜单管理',NULL,NULL,''),
	 ('9cdaa8eb-ce20-4f0d-b637-d05de57529d3',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:39:53',NULL,NULL,NULL,NULL,0,NULL,'文件管理',NULL,NULL,''),
	 ('a15656ed-a402-4958-9794-0126d4ab97b4',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:44:48',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','修改角色','PUT','/v1/api/role',''),
	 ('a99f9cbf-6908-4083-ab34-56b73aa1f324',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:43:11',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','删除账号','DELETE','/v1/api/user',''),
	 ('aecb5cf7-67f3-4000-a78a-81501741a959',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:46:04',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','删除菜单','DELETE','/v1/api/menu',''),
	 ('b248e429-0616-4c6c-8eb6-885938fec596',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:45:52',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','修改菜单','PUT','/v1/api/menu',''),
	 ('be467df5-518e-491f-a463-75bea28317f8',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:46:24',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','获取接口列表','GET','/v1/api/perm',''),
	 ('c7f6c774-615c-4bc4-8e5b-fddf2600bb8c',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:44:19',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','获取角色列表','GET','/v1/api/role/list',''),
	 ('d8020802-f237-48a8-ad7a-6b94122fb9b0',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:39:12',NULL,NULL,NULL,NULL,0,NULL,'账号管理',NULL,NULL,'');
INSERT INTO `service-one-dev`.sys_perm (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,`type`,parent_id,name,`method`,`path`,remark) VALUES
	 ('e915c9a6-3130-4dd9-af15-ff499ebad644',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:46:50',NULL,NULL,NULL,NULL,1,'25392c39-c929-48a9-af2a-bc3a43bfe53e','修改接口','PUT','/v1/api/perm',''),
	 ('f54a9220-872e-490a-bbec-ff5d50382641',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:44:32',NULL,NULL,NULL,NULL,1,'11cb750b-17ea-400b-a032-1b7ebb5aa747','新增角色','POST','/v1/api/role',''),
	 ('f5de5b00-2d5e-4a1f-9695-411128d67c15',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:42:55',NULL,NULL,NULL,NULL,1,'d8020802-f237-48a8-ad7a-6b94122fb9b0','修改账号','PUT','/v1/api/user',''),
	 ('ff392faa-05f2-4ea8-9626-2788773da77e',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:47:16',NULL,NULL,NULL,NULL,1,'9cdaa8eb-ce20-4f0d-b637-d05de57529d3','查询列表','GET','/v1/api/oss',''),
	 ('ff5942a8-718b-4a31-9578-4d22e74b131b',0,'ee39dc66-e74e-435e-8af9-5a10680e64ba','2024-07-02 16:45:39',NULL,NULL,NULL,NULL,1,'5ea30c64-8058-4723-8637-91ca330ae34a','新增菜单','POST','/v1/api/menu','');



INSERT INTO `service-one-dev`.sys_user (id,isDeleted,createdBy,createdAt,updatedBy,updatedAt,deletedBy,deletedAt,password,salt,account,phone_num,email,status,nickname,avatar,remark,isSystem) VALUES
	 ('ee39dc66-e74e-435e-8af9-5a10680e64ba',0,NULL,'2024-07-02 16:03:55',NULL,NULL,NULL,NULL,'$2a$10$THKoxD8oMSeMOGEx4NQduOKkYoB.O8hykEegDe1VUftjNPAtUcHdO','$2a$10$THKoxD8oMSeMOGEx4NQduO','admin','15173886750','',1,'Super_Admin','','',0);
