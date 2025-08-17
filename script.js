// دالة تحميل التطبيق
function downloadApp() {
    const downloadBtn = document.querySelector('.download-btn');
    const downloadProgress = document.getElementById('downloadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // إضافة حالة التحميل
    downloadBtn.classList.add('loading');
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري التحميل...</span>';
    downloadProgress.style.display = 'block';
    
    // محاكاة شريط التقدم
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = 'جاري إعداد التحميل...';
        } else if (progress < 60) {
            progressText.textContent = 'جاري تحميل الملف...';
        } else if (progress < 90) {
            progressText.textContent = 'جاري إكمال التحميل...';
        } else {
            progressText.textContent = 'اكتمل التحميل!';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // إزالة حالة التحميل وإظهار النجاح
            setTimeout(() => {
                downloadBtn.classList.remove('loading');
                downloadBtn.classList.add('success');
                downloadBtn.innerHTML = '<i class="fas fa-check"></i><span>تم التحميل بنجاح!</span>';
                
                // بدء التحميل الفعلي
                startActualDownload();
                
                // إخفاء شريط التقدم بعد ثانيتين
                setTimeout(() => {
                    downloadProgress.style.display = 'none';
                    // إعادة تعيين الزر بعد 3 ثوان
                    setTimeout(() => {
                        downloadBtn.classList.remove('success');
                        downloadBtn.innerHTML = '<i class="fas fa-download"></i><span>تحميل التطبيق</span>';
                    }, 3000);
                }, 2000);
            }, 500);
        }
    }, 200);
}

// دالة بدء التحميل الفعلي
function startActualDownload() {
    // إنشاء رابط تحميل
    const link = document.createElement('a');
    link.href = 'NoAd.apk';
    link.download = 'NoAd.apk';
    link.style.display = 'none';
    
    // إضافة الرابط للصفحة وتنفيذ التحميل
    document.body.appendChild(link);
    link.click();
    
    // إزالة الرابط
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
}

// إضافة تأثيرات تفاعلية إضافية
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور العناصر تدريجياً
    const elements = document.querySelectorAll('.app-card, .instructions');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // تأثير النقر على الأزرار
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إنشاء تأثير النقر
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // إضافة تأثير التمرير السلس
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // إضافة تأثيرات للعناصر عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('.feature, .download-info > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// إضافة CSS للـ ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// إضافة دالة للتحقق من دعم التحميل
function checkDownloadSupport() {
    const link = document.createElement('a');
    return link.download !== undefined;
}

// إضافة رسالة تحذير إذا كان المتصفح لا يدعم التحميل
if (!checkDownloadSupport()) {
    const warning = document.createElement('div');
    warning.style.cssText = `
        background: #ffc107;
        color: #856404;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    `;
    warning.textContent = 'تحذير: متصفحك قد لا يدعم التحميل التلقائي. سيتم فتح الملف في نافذة جديدة.';
    
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.parentNode.insertBefore(warning, downloadBtn);
}
