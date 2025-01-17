// 수료증 생성을 위한 기본 설정
const CERTIFICATE_CONFIG = {
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  borderColor: "#000000",
  borderWidth: 10,
  fontFamily: "Arial",
  titleSize: 40,
  nameSize: 30,
  dateSize: 20
};

// 수료증 생성 클래스
class CertificateGenerator {
  constructor() {
    // 캔버스 생성
    this.canvas = new Canvas(CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
    this.ctx = this.canvas.getContext('2d');
  }

  // 사용자 캐릭터 이미지 가져오기
  async getUserSprite(player) {
    const sprite = player.sprite;
    if (!sprite) {
      throw new Error("캐릭터 이미지를 불러올 수 없습니다.");
    }
    return sprite;
  }

  // 수료증 생성
  async generateCertificate(player, courseTitle, completionDate) {
    // 배경 설정
    this.ctx.fillStyle = CERTIFICATE_CONFIG.backgroundColor;
    this.ctx.fillRect(0, 0, CERTIFICATE_CONFIG.width, CERTIFICATE_CONFIG.height);
    
    // 테두리 그리기
    this.ctx.strokeStyle = CERTIFICATE_CONFIG.borderColor;
    this.ctx.lineWidth = CERTIFICATE_CONFIG.borderWidth;
    this.ctx.strokeRect(
      CERTIFICATE_CONFIG.borderWidth/2, 
      CERTIFICATE_CONFIG.borderWidth/2, 
      CERTIFICATE_CONFIG.width - CERTIFICATE_CONFIG.borderWidth,
      CERTIFICATE_CONFIG.height - CERTIFICATE_CONFIG.borderWidth
    );

    // 제목 추가
    this.ctx.font = `${CERTIFICATE_CONFIG.titleSize}px ${CERTIFICATE_CONFIG.fontFamily}`;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText("수료증", CERTIFICATE_CONFIG.width/2, 100);

    // 사용자 캐릭터 이미지 추가
    const sprite = await this.getUserSprite(player);
    const spriteSize = 100;
    this.ctx.drawImage(
      sprite,
      (CERTIFICATE_CONFIG.width - spriteSize)/2,
      150,
      spriteSize,
      spriteSize
    );

    // 이름 추가
    this.ctx.font = `${CERTIFICATE_CONFIG.nameSize}px ${CERTIFICATE_CONFIG.fontFamily}`;
    this.ctx.fillText(player.name, CERTIFICATE_CONFIG.width/2, 300);

    // 과정명 추가
    this.ctx.fillText(courseTitle, CERTIFICATE_CONFIG.width/2, 350);

    // 날짜 추가
    this.ctx.font = `${CERTIFICATE_CONFIG.dateSize}px ${CERTIFICATE_CONFIG.fontFamily}`;
    this.ctx.fillText(completionDate, CERTIFICATE_CONFIG.width/2, 450);

    return this.canvas.toDataURL();
  }
}

// Zep 스크립트에서 사용할 수 있도록 내보내기
export default CertificateGenerator; 