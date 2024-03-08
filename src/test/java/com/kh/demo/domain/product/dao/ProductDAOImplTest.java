package com.kh.demo.domain.product.dao;

import com.kh.demo.domain.entity.Product;
import com.kh.demo.domain.entity.Tester;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest  // springboot테스트환경 실행
class ProductDAOImplTest {

  @Autowired  // springboot 컨테이너의 객체를 주입 받는다.
  ProductDAO productDAO;

  @Test
  @DisplayName("상품여러건등록")
  void saveMultipleProducts() {
    long start = 1;
    long end = 115;
    for(long i=start; i<=end; i++) {
      Product product = new Product();
      product.setPname("사용자"+i);
      product.setQuantity("제목"+i);
      product.setPrice("내용"+i);
      Long productId = productDAO.save(product);
    }
//    log.info("productId={}{}", productId,"2");
  }

  @Test
  @DisplayName("상품여러건댓글등록")
  void saveMultipleProductsMini() {
    long start = 1;
    long end = 115;
    for(long i=start; i<=end; i++) {
      Tester tester = new Tester();
      tester.setNickname("사용자"+i);
      tester.setEmail("이메일"+i);
      tester.setTesetlog("댓글내용"+i);
      Long testerId = productDAO.savetext(tester);
    }
//    log.info("productId={}{}", productId,"2");
  }
}