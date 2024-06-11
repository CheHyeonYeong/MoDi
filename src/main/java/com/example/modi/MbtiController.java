package com.example.modi;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/mbti")
public class MbtiController {

    private final MbtiService mbtiService;

    @PostMapping(value = "/result")
    public Map<String, Object> calmbti(@RequestBody MbtiDTO mbtiDto){
        Map<String, Object> resultMap = new HashMap<>();
        // dto로 받아온 데이터로 service한테 mbti를 계산하게 하고, 결과 값을 받아옴.
        String result = mbtiService.calResult(mbtiDto);

        // Dto를 Entity화
        MbtiResult mbtiResult = mbtiDto.toEntity();

        // Service한테 넘겨서 Repository한테 Entity를 DB안에 저장하게 함.
        mbtiService.save(mbtiResult);

        // 전체 결과 수와 특정 MBTI 결과 수를 조회
        long totalCount = mbtiService.getTotalCount();
        long countByResult = mbtiService.getCountByResult(result);

        // 백분율 계산 (특정 MBTI 결과 수 / 전체 결과 수 * 100)
        double percentage = (double)countByResult / totalCount * 100;

        resultMap.put("result", result);
        resultMap.put("percentage", percentage);
        return resultMap;
    }
}
