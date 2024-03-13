package com.example.jaWeb;

import java.sql.*;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;

public class JDBC {
    public static Statement s = null;
    public static ResultSet rs = null;
    public static Connection con = null;
    public static PreparedStatement ps = null;
    public static String playurl = "jdbc:mysql://localhost:3306/playerdata";
    public static String adminerurl = "jdbc:mysql://localhost:3306/admindata";
    public static final String username = "root";
    public static final String password = "k20020727";




    //连接普通用户数据库
    public static void playerConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(playurl, username, password);
            s = con.createStatement();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("连接失败");
        }
    }

    //连接管理员数据库
    public static void adminerConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(adminerurl, username, password);
            s = con.createStatement();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("连接失败");
        }
    }
    //获取管理员数据
    public static StringBuffer getadminer() {
        try {
            adminerConnection();
            rs = s.executeQuery(String.format("select id,name,password from adminer"));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("[{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            sb.append("]");
            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //获取用户数据
    public static StringBuffer getplayer() {
        try {
            playerConnection();
            rs = s.executeQuery(String.format("select id,name,password from player"));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("[{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            sb.append("]");
            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //插入用户新数据
    //插入用户新数据
    public static void insertPlayerData(String userName, String password) throws Exception {
        playerConnection();
        String sql="select * from player";
        rs = s.executeQuery(sql);
        while (rs.next()) {
            String key = rs.getString("name");
            if (userName.equals(key)) {
                return;             //由于JSP Tomcat特性，jsp的java代码会被执行两次，这里防止插入两次同样的数据作处理
            }
        }
        ps=con.prepareCall("insert into player (name,password,easy,mid,hard) values (?,?,'0','0','0')");
        ps.setString(1,userName);
        ps.setString(2,password);
        ps.executeUpdate();
    }

    //添加新管理员
    public static void insertAdminerData(String userName, String password) throws Exception {
        adminerConnection();
        String sql="select * from adminer";
        rs = s.executeQuery(sql);
        while (rs.next()) {
            String key = rs.getString("name");
            if (userName.equals(key)) {
                return;             //由于JSP Tomcat特性，jsp的java代码会被执行两次，这里防止插入两次同样的数据作处理
            }
        }
        ps=con.prepareCall("insert into adminer (name,password) values (?,?)");
        ps.setString(1,userName);
        ps.setString(2,password);
        ps.executeUpdate();
    }

    //用户数据库中是否存在某个用户
    public static boolean isPlayer(String userName) {
        try {
            playerConnection();
            ResultSet rs = s.executeQuery(String.format("select name from player"));
            while (rs.next()) {
                if (userName.equals(rs.getString("name"))) {
                    return true;
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //用户数据库中是否存在某个用户
    public static boolean isAdminer(String username) {
        try {
            adminerConnection();
            ResultSet rs = s.executeQuery(String.format("select name from adminer"));
            while (rs.next()) {
                if (username.equals(rs.getString("name"))) {
                    return true;
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //获取管理员密码
    public static String getAdminerPassword(String userName) {
        try {
            adminerConnection();
            rs = s.executeQuery(String.format("select * from adminer"));
            while (rs.next()) {
                if (userName.equals(rs.getString("name"))) {
                    return rs.getString("password");
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return "没有数据";
    }

    //获取用户密码
    public static String getPlayerPassword(String userName) {
        try {
            playerConnection();
            rs = s.executeQuery(String.format("select * from player"));
            while (rs.next()) {
                if (userName.equals(rs.getString("name"))) {
                    return rs.getString("password");
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return "没有数据";
    }


    //获取分数
    public static StringBuffer getGoal(String level) {
        try {
            playerConnection();
            ArrayList<String> list= new ArrayList<>();
            rs = s.executeQuery(String.format("select name,%s from player",level));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("[{\"name\":"+rs.getString(1)+",\"time\":"+rs.getString(2)+"}");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("{\"name\":"+rs.getString(1)+",\"time\":"+rs.getString(2)+"}");
            }
            sb.append("]");
            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //更新分数
    public static void editGoal(String username, String level ,String goal) {
        try {
            playerConnection();
            String sql;
            sql = String.format("update player set %s=%d where username='%s'", level, goal, username);
            s.execute(sql);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    //获取管理员总数
    public static String getAdminerCount(){
        try {
            adminerConnection();
            rs = s.executeQuery(String.format("select count(*) from adminer"));
            if(rs.next()) {
                return rs.getString(1);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //获取用户总数

    public static String getPlayerCount(){
        try {
            playerConnection();
            rs=s.executeQuery(String.format("select count(*) from player"));
            if(rs.next()){
                return rs.getString(1);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //删除管理员信息
    public static void DeleteAdminer(String username){
        try {
            adminerConnection();
            s.execute(String.format("delete from adminer where name='%s'",username));
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    //删除用户信息
    public static void DeletePlayer(String username){
        try {
            playerConnection();
            s.execute(String.format("delete from player where name='%s'",username));
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    //记录管理员操作
    public static void WriteAdminer(String username,String d,String op){
        try {
            adminerConnection();
            s.execute(String.format("insert into opration value('%s','%s','%s')",username,d,op));
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    //记录用户操作
    public static void WritePlayer(String username,String d,String op){
        try {
            playerConnection();
            s.execute(String.format("insert into opration value('%s','%s','%s')",username,d,op));
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    //读取管理员操作日志
    public static StringBuffer AdminerLog(){
        try {
            adminerConnection();
            rs = s.executeQuery(String.format("select * from opration"));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3)+"\n");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3)+"\n");
            }
            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    //读取用户操作日志
    public static StringBuffer PlayerLog(){
        try {
            playerConnection();
            rs = s.executeQuery(String.format("select * from opration"));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3)+"\n");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3)+"\n");
            }

            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //更新管理员信息
    public static void updataadminer(String no,String name,String password) throws SQLException {
        adminerConnection();
        ps=con.prepareCall("update adminer set name=?,password=? where id=?");
        ps.setString(1,name);
        ps.setString(2,password);
        ps.setString(3,no);
        ps.executeUpdate();
        String sql="select * from adminer";
        rs = s.executeQuery(sql);
        while (rs.next()) {
            String key = rs.getString("name");
            if (name.equals(key)) {
                return;
                          //由于JSP Tomcat特性，jsp的java代码会被执行两次，这里防止插入两次同样的数据作处理
            }
        }

    }

    //更新用户信息
    public static void updataplayer(String no,String name,String password) throws SQLException {
        playerConnection();
        ps=con.prepareCall("update player set name=?,password=? where id=?");
        ps.setString(1,name);
        ps.setString(2,password);
        ps.setString(3,no);
        ps.executeUpdate();
        String sql="select * from player";
        rs = s.executeQuery(sql);
        while (rs.next()) {
            String key = rs.getString("name");
            if (name.equals(key)) {
                return;             //由于JSP Tomcat特性，jsp的java代码会被执行两次，这里防止插入两次同样的数据作处理
            }
        }

    }

    public static StringBuffer searchAdminer(String name){
        try {
            adminerConnection();
            PreparedStatement ps=null;
            ps=con.prepareCall("select id,`name`,password from adminer where `name`like"+"'"+name+"%'");
            rs=ps.executeQuery();
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("[{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");

            }
            sb.append("]");
            if(!("]".equals(sb.toString())))
                return sb;
            return null;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static StringBuffer searchPlayer(String name){
        try {
            playerConnection();
            PreparedStatement ps=null;
            ps=con.prepareCall("select id,`name`,password from player where `name`like"+"'"+name+"%'");

            rs=ps.executeQuery();
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("[{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("{\"id\":"+rs.getString(1)+",\"name\":"+rs.getString(2)+",\"password\":"+rs.getString(3)+"}");
            }
            sb.append("]");
            if(!("]".equals(sb.toString())))
            return sb;
            return null;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String commenturl="jdbc:mysql://localhost:3306/comment";

    //连接评论数据库
    public static void commentConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(commenturl, username, password);
            s = con.createStatement();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("连接失败");
        }
    }


    //获取评论
    //获取评论
    public static StringBuffer getCommentdata(){
        try {
            commentConnection();
            rs = s.executeQuery(String.format("select CName,CContent from CTable"));
            StringBuffer sb=new StringBuffer();
            if(rs.next()){
                sb.append("用户"+rs.getString(1)+"评论:"+rs.getString(2)+"\n");
            }
            while (rs.next()) {
                sb.append(",");
                sb.append("用户"+rs.getString(1)+"评论:"+rs.getString(2)+"\n");
            }
            return sb;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    //写入评论
    public static void insertComment(String name, String comment) throws Exception {
        commentConnection();
        ps=con.prepareCall("insert into CTable (CName,CContent) values (?,?)");
        ps.setString(1,name);
        ps.setString(2,comment);
        ps.executeUpdate();
    }

    public static String faceurl="jdbc:mysql://localhost:3306/face";


    //连接人脸识别数据库
    public static void faceConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(faceurl, username, password);
            s = con.createStatement();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("连接失败");
        }
    }

    //插入人脸信息
    public static void insertFace(String name,String location) throws SQLException {
        faceConnection();
//        String sql="select * from faceinadmin";
//        rs = s.executeQuery(sql);
//        while (rs.next()) {
//            String key = rs.getString("Aname");
//            if (name.equals(key)) {
//                return;             //由于JSP Tomcat特性，jsp的java代码会被执行两次，这里防止插入两次同样的数据作处理
//            }
//        }
        ps=con.prepareCall("insert into faceinadmin (Aname,url) values(?,?)");
        ps.setString(1,name);
        ps.setString(2,location);
        ps.executeUpdate();
    }

    //获取人脸信息
    public static String getFace(String name) throws SQLException {
        faceConnection();
        String sql="select url from faceinadmin";
        rs = s.executeQuery(sql);
        ps=con.prepareCall("select url from faceinadmin where Aname=?");
        ps.setString(1,name);
        rs=ps.executeQuery();
        if(rs.next()){
            return rs.getString(1);
        }
        return null;
    }
}

