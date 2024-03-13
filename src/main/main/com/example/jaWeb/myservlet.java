package com.example.jaWeb;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/aa")
@MultipartConfig
public class myservlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        // 获取上传的文件
//        Part part = request.getPart("image");
//
//        // 生成文件名，例如使用时间戳作为文件名
//        String fileName = System.currentTimeMillis() + ".jpg";
//
//        // 保存文件到指定路径
//        String savePath = "C:/path/to/save/image/";
//        try (InputStream inputStream = part.getInputStream()) {
//            Files.copy(inputStream, Path.of(savePath + fileName), StandardCopyOption.REPLACE_EXISTING);
//        }

        // 返回响应，告知保存成功
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("Image saved successfully!");
//        PrintWriter out = response.getWriter();
//                out.print("registered");
//                out.flush();
    }
}
