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

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/mbti")
public class MbtiController {

    private final MbtiService mbtiService;

    @PostMapping(value = "/result")
    public Map<String, String> calmbti(@RequestBody MbtiDTO mbtiDto){
        Map<String, String> resultMap = new HashMap<>();
        // dto로 받아온 데이터로 service한테 mbti를 계산하게 하고, 결과 값을 받아옴.
        String result = mbtiService.calResult(mbtiDto);

        // Dto를 Entity화
        MbtiResult mbtiResult = mbtiDto.toEntity();

        // Service한테 넘겨서 Repository한테 Entity를 DB안에 저장하게 함.
        mbtiService.save(mbtiResult);

        log.info(result + " 안녕 클레오 파트라");
        resultMap.put("result", result);
        return resultMap;
    }
}
