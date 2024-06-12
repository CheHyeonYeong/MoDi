package com.example.modi;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MbtiDTO { // DTO
    private int E,I,N,S,T,F,P,J;
    private String mbti1,mbti2,mbti3,mbti4;
    private String result;

    public MbtiResult toEntity() {
        return new MbtiResult(null, result, null);
    }
}
