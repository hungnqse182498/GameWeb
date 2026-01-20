// File: questions.js
// Đây là nơi chứa dữ liệu câu hỏi. Bạn có thể thêm bớt tùy ý.

const questionBank = [
    // --- 1. ĐỊNH NGHĨA & ĐẶC TRƯNG GIAI CẤP ---
    {
        q: "Theo Lênin, đặc trưng quan trọng nhất để phân biệt các giai cấp là gì?",
        a: ["Quan hệ đối với tư liệu sản xuất", "Mức thu nhập", "Vai trò quản lý", "Trình độ học vấn"],
        correct: 0
    },
    {
        q: "Thực chất của quan hệ giai cấp trong xã hội có đối kháng là gì?",
        a: ["Quan hệ giữa bóc lột và bị bóc lột", "Quan hệ hợp tác", "Quan hệ hỗ trợ", "Quan hệ bình đẳng"],
        correct: 0
    },
    {
        q: "Giai cấp là những tập đoàn người có địa vị kinh tế - xã hội như thế nào?",
        a: ["Khác nhau", "Giống nhau", "Tương đồng", "Hoàn toàn đối lập"],
        correct: 0
    },
    {
        q: "Sự khác nhau về quan hệ đối với tư liệu sản xuất dẫn đến sự khác nhau về điều gì?",
        a: ["Vai trò trong tổ chức lao động & cách thức hưởng thụ", "Uy tín chính trị", "Sức khỏe thể chất", "Nguồn gốc xuất thân"],
        correct: 0
    },

    // --- 2. NGUỒN GỐC GIAI CẤP ---
    {
        q: "Nguyên nhân sâu xa dẫn đến sự ra đời của giai cấp là gì?",
        a: ["Sự phát triển của Lực lượng sản xuất & chế độ tư hữu", "Chiến tranh", "Sự gia tăng dân số", "Tham vọng của thủ lĩnh"],
        correct: 0
    },
    {
        q: "Nguyên nhân trực tiếp dẫn đến sự ra đời của giai cấp là gì?",
        a: ["Sự phân hóa xã hội thành các nhóm có địa vị kinh tế khác nhau", "Sự thay đổi khí hậu", "Sự xuất hiện của tiền tệ", "Sự phát triển của tôn giáo"],
        correct: 0
    },
    {
        q: "Điều kiện kiên quyết để giai cấp hình thành là phải có yếu tố nào?",
        a: ["Sản phẩm thặng dư và chế độ tư hữu", "Nhà nước và pháp luật", "Chữ viết và văn hóa", "Công cụ bằng kim loại"],
        correct: 0
    },
    {
        q: "Con đường hình thành giai cấp diễn ra thông qua đâu?",
        a: ["Phân công lao động, tích lũy của cải, chiếm hữu TLSX", "Các cuộc họp bộ lạc", "Sự bầu chọn thủ lĩnh", "Sự di cư đến vùng đất mới"],
        correct: 0
    },

    // --- 3. KẾT CẤU GIAI CẤP ---
    {
        q: "Kết cấu giai cấp trong một xã hội bao gồm những thành phần nào?",
        a: ["Giai cấp cơ bản, không cơ bản, tầng lớp & nhóm xã hội", "Chỉ có giai cấp thống trị và bị trị", "Chỉ có người giàu và người nghèo", "Công nhân, nông dân và trí thức"],
        correct: 0
    },
    
    // --- 4. ĐẤU TRANH GIAI CẤP (LÝ THUYẾT CHUNG) ---
    {
        q: "Đấu tranh giai cấp là cuộc đấu tranh của ai chống lại ai?",
        a: ["Quần chúng bị áp bức chống lại giai cấp thống trị", "Nước này chống lại nước khác", "Nhóm người này chống nhóm người khác", "Cá nhân chống lại tập thể"],
        correct: 0
    },
    {
        q: "Mục tiêu cuối cùng của đấu tranh giai cấp là gì?",
        a: ["Lật đổ ách thống trị, xác lập trật tự xã hội mới tiến bộ hơn", "Trả thù cá nhân", "Giành lấy tài sản chia đều", "Thay đổi người lãnh đạo"],
        correct: 0
    },
    {
        q: "Vai trò của đấu tranh giai cấp đối với lịch sử là gì?",
        a: ["Là động lực trực tiếp phát triển xã hội có giai cấp", "Kìm hãm sự phát triển", "Gây mất đoàn kết nội bộ", "Làm suy yếu nền kinh tế"],
        correct: 0
    },
    {
        q: "Thông qua đấu tranh giai cấp, điều gì sẽ xảy ra với các hình thái kinh tế - xã hội?",
        a: ["Hình thái cũ bị thay thế bằng hình thái mới tiến bộ hơn", "Hình thái cũ được củng cố vững chắc hơn", "Xã hội quay về thời kỳ nguyên thủy", "Không có sự thay đổi nào"],
        correct: 0
    },

    // --- 5. ĐẤU TRANH GIAI CẤP CỦA GIAI CẤP VÔ SẢN ---
    {
        q: "Khi chưa có chính quyền, giai cấp vô sản đấu tranh dưới các hình thức nào?",
        a: ["Kinh tế, Chính trị, Tư tưởng", "Vũ trang, Ngoại giao, Binh vận", "Thương mại, Giáo dục, Y tế", "Biểu tình, Bãi công, Đập phá"],
        correct: 0
    },
    {
        q: "Mục tiêu của 'Đấu tranh chính trị' khi chưa có chính quyền là gì?",
        a: ["Giành chính quyền về tay nhân dân lao động", "Đòi tăng lương giảm giờ làm", "Tuyên truyền chủ nghĩa Mác", "Cải thiện điều kiện làm việc"],
        correct: 0
    },
    {
        q: "Đấu tranh giai cấp trong thời kỳ quá độ lên CNXH có đặc điểm gì?",
        a: ["Diễn ra trong điều kiện mới, nội dung mới, hình thức mới", "Kết thúc hoàn toàn", "Chỉ còn đấu tranh vũ trang", "Giống hệt thời kỳ chưa có chính quyền"],
        correct: 0
    },
    {
        q: "Tại sao đấu tranh giai cấp vẫn tồn tại trong thời kỳ quá độ?",
        a: ["Vì các giai cấp có lợi ích khác nhau chưa mất đi hoàn toàn", "Vì nhà nước muốn duy trì quyền lực", "Vì do sự kích động của nước ngoài", "Vì nền kinh tế chưa phát triển"],
        correct: 0
    },

    // --- 6. ĐẤU TRANH GIAI CẤP Ở VIỆT NAM HIỆN NAY ---
    {
        q: "Nội dung chủ yếu của đấu tranh giai cấp ở Việt Nam hiện nay là gì?",
        a: ["Thực hiện thắng lợi sự nghiệp CNH-HĐH theo định hướng XHCN", "Đấu tranh lật đổ giai cấp tư sản", "Tịch thu tài sản của người giàu", "Đóng cửa biên giới để tự phát triển"],
        correct: 0
    },
    {
        q: "Một trong những nội dung đấu tranh giai cấp ở VN hiện nay là chống lại cái gì?",
        a: ["Chống tham nhũng, tiêu cực, suy thoái tư tưởng", "Chống lại nền kinh tế thị trường", "Chống lại sự hội nhập quốc tế", "Chống lại tầng lớp doanh nhân"],
        correct: 0
    },
    {
        q: "Hình thức đấu tranh giai cấp chủ yếu ở Việt Nam hiện nay là gì?",
        a: ["Dùng hành chính, giáo dục, pháp luật, kinh tế", "Dùng bạo lực cách mạng", "Dùng chiến tranh vũ trang", "Dùng biện pháp quân sự là chính"],
        correct: 0
    },
    {
        q: "Trong thời kỳ quá độ ở VN, mối quan hệ giữa các giai cấp chủ yếu là gì?",
        a: ["Hợp tác và đấu tranh trong nội bộ nhân dân", "Đối kháng gay gắt một mất một còn", "Hoàn toàn hòa hợp không mâu thuẫn", "Tách biệt không liên quan nhau"],
        correct: 0
    },

    // --- 7. CÁC HÌNH THỨC CỘNG ĐỒNG NGƯỜI ---
    {
        q: "Hình thức cộng đồng người nào xuất hiện sớm nhất trong lịch sử?",
        a: ["Thị tộc", "Bộ lạc", "Bộ tộc", "Dân tộc"],
        correct: 0
    },
    {
        q: "Thứ tự phát triển các hình thức cộng đồng người trong lịch sử là?",
        a: ["Thị tộc -> Bộ lạc -> Bộ tộc -> Dân tộc", "Gia đình -> Dòng họ -> Bộ lạc -> Quốc gia", "Bộ lạc -> Thị tộc -> Dân tộc -> Bộ tộc", "Thị tộc -> Bộ tộc -> Bộ lạc -> Dân tộc"],
        correct: 0
    },
    {
        q: "Hình thức cộng đồng người phổ biến nhất hiện nay là gì?",
        a: ["Dân tộc", "Bộ tộc", "Bộ lạc", "Liên minh châu Âu"],
        correct: 0
    },

    // --- 8. ĐẶC TRƯNG DÂN TỘC ---
    {
        q: "Đâu là đặc trưng cơ bản của Dân tộc?",
        a: ["Chung lãnh thổ, kinh tế, ngôn ngữ, văn hóa, nhà nước", "Chung huyết thống, màu da, tôn giáo", "Chung người đứng đầu, tập tục, tín ngưỡng", "Chung biên giới, quân đội, đồng tiền"],
        correct: 0
    },
    {
        q: "Yếu tố nào là quan trọng nhất để liên kết các thành viên trong một dân tộc?",
        a: ["Phương thức sinh hoạt kinh tế chung", "Cùng một tôn giáo", "Cùng một dòng máu", "Cùng một sở thích"],
        correct: 0
    },

    // --- 9. TÍNH ĐẶC THÙ HÌNH THÀNH DÂN TỘC ---
    {
        q: "Ở Châu Âu, sự hình thành dân tộc gắn liền với sự kiện gì?",
        a: ["Sự ra đời và phát triển của Chủ nghĩa tư bản", "Sự sụp đổ của để chế La Mã", "Sự phát triển của đạo Thiên Chúa", "Sự phát minh ra máy hơi nước"],
        correct: 0
    },
    {
        q: "Ở phương Đông, dân tộc thường được hình thành như thế nào?",
        a: ["Rất sớm, không gắn trực tiếp với sự ra đời của CNTB", "Muộn hơn châu Âu", "Gắn liền với chế độ chiếm hữu nô lệ", "Do sự áp đặt của phương Tây"],
        correct: 0
    },
    {
        q: "Đặc thù nổi bật của sự hình thành dân tộc Việt Nam là gì?",
        a: ["Gắn liền với quá trình dựng nước và giữ nước (chống ngoại xâm)", "Gắn liền với sự phát triển thương mại biển", "Gắn liền với các cuộc thập tự chinh", "Gắn liền với sự ra đời của Đảng Cộng sản"],
        correct: 0
    },
    {
        q: "Dân tộc Việt Nam bắt đầu hình thành rõ nét từ thời kỳ nào?",
        a: ["Khi nước Đại Việt giành được độc lập", "Thời kỳ Hùng Vương", "Thời kỳ Pháp thuộc", "Năm 1945"],
        correct: 0
    }
];