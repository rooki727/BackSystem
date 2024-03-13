package com.example.jaWeb;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;


@WebServlet("/facelogin")
public class facelogin extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 获取Base64编码的图像数据
        String imageData = request.getParameter("imageData");
        String username=request.getParameter("username");
        // 解码Base64数据为字节数组
        byte[] imageBytes;
        try {
            imageBytes = Base64.getDecoder().decode(imageData.split(",")[1]);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            // 处理解码错误，例如记录日志或返回错误响应给前端
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Base64 encoding.");
            return;
        }
        long currentTimeMillis = System.currentTimeMillis();
        // 格式化时间戳为日期字符串，包括分钟级别，用作文件夹名
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmm");
        String folderName = dateFormat.format(new Date(currentTimeMillis));
        String folderPath = "D:/savelogin/" +username+","+ folderName + "/";
        String folderPath_1 = "D:/savelogin_1/" + username + "," + folderName + "/";
        // 构建图像文件路径
        File folder = new File(folderPath);
        if (!folder.exists()) {
            folder.mkdir(); // 创建多级目录
        }
        File folder1 = new File(folderPath_1);
        if (!folder1.exists()) {
            folder1.mkdir(); // 创建多级目录
        }
        String imagePath = folderPath +username+ ","+currentTimeMillis + ".jpg";
//url存入数据库
//        System.out.println(folderPath);
        //将name，url发送给另一个servlet
        request.getSession().setAttribute("FLusername",username);
        request.getSession().setAttribute("FLurl",folderPath);
//        request.getSession().setAttribute("FLurl_1",folderPath_1);
        // 保存图片到本地文件系统
        try (FileOutputStream imageOutputStream = new FileOutputStream(imagePath)) {
            imageOutputStream.write(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            // 处理异常，例如记录日志或返回错误响应给前端
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to save image.");
            return;
        }

        // 返回成功响应给前端
        response.getWriter().write("Image uploaded successfully!");
    }
}
