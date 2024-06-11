package com.example.modi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MbtiRepository extends JpaRepository<MbtiResult, Long> {

    // 특정 MBTI 결과의 개수를 조회하는 메서드
    long countByResult(String result);

}
