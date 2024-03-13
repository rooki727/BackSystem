package com.example.jaWeb;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;


@WebServlet("/faceregisterServlet")
public class faceregisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String username = request.getParameter("username");
        // 获取Base64编码的图像数据
        String imageData = request.getParameter("imageData");

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
        String folderPath = "D:/saveregister/" + username + "," + folderName + "/";
        String folderPath_1 = "D:/saveregister_1/" + username + "," + folderName + "/";

//        System.out.println(username+" "+folderPath+" "+folderPath_1);
        // 构建图像文件路径
        File folder = new File(folderPath);
        if (!folder.exists()) {
            folder.mkdir(); // 创建多级目录
        }
        File folder1 = new File(folderPath_1);
        if (!folder1.exists()) {
            folder1.mkdir(); // 创建多级目录
        }
        String imagePath = folderPath + username + "," + currentTimeMillis + ".jpg";

        //将name，url发送给另一个servlet
        request.getSession().setAttribute("FRusername",username);
        request.getSession().setAttribute("FRurl",folderPath);
        request.getSession().setAttribute("FRurl_1",folderPath_1);
        //在另一个servlet存，name,url存入数据库

//        System.out.println(folderPath);
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
//        if(true){
//            try {
//                Integer totalTestCaseCount = 0;
//                //传入python文件的参数： String xmindFilePath, String testCaseKeyWord
//                for (String keyword : testCaseKeyWord.split(",")) { //英文逗号作为分隔符号
//                    String parameterData = "python " + pythonFilePath + " \"" + xmindFilePath + "\" \"" + keyword + "\"";//因为xmindFilePath和keyword的值可能有空格，所以需要双引号
//                    Process process = Runtime.getRuntime().exec(parameterData);
//                    //获取Pyhton输出字符串 作为输入流被Java读取
//                    BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
//                    String s = null;
//                    Integer testCaseCount = 0;
//                    while ((s = in.readLine()) != null) {
//                        //                System.out.println(s);
//                        testCaseCount = Integer.valueOf(s);
//                    }
//                    logger.info("Get Test Case keyword {}'s count is {} from xmind file", keyword, testCaseCount);
//                    in.close();
//
//
//                }
//    }
//
//
//
//}
    }
    }