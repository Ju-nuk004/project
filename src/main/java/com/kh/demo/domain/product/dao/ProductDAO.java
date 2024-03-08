package com.kh.demo.domain.product.dao;

import com.kh.demo.domain.entity.Product;
import com.kh.demo.domain.entity.Tester;

import java.util.List;
import java.util.Optional;

public interface ProductDAO {
  //등록
  Long save(Product product);
  //조회
  //Optional 객체를 최대 1개를 저장할수 있는 컬렉션
  Optional<Product> findById(Long productId);

  //목록전체
  List<Product> findAll();
  //페이지전체
  List<Product> findAll(Long reqPage,Long recordCnt);

  //단건삭제
  int deleteById(Long productId);

  //여러건삭제
  int deleteByIds(List<Long> productIds);

  //수정
  int updateById(Long productId, Product product);

  //총레코드 건수
  int totalCnt();


  Long savetext(Tester tester);


  Optional<Tester> findByTextId(Long testerId);

  List<Tester> findTextAll(Long reqPage,Long recordCnt);
}
