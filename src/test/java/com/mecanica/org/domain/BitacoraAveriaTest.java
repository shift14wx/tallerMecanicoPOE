package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class BitacoraAveriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BitacoraAveria.class);
        BitacoraAveria bitacoraAveria1 = new BitacoraAveria();
        bitacoraAveria1.setId(1L);
        BitacoraAveria bitacoraAveria2 = new BitacoraAveria();
        bitacoraAveria2.setId(bitacoraAveria1.getId());
        assertThat(bitacoraAveria1).isEqualTo(bitacoraAveria2);
        bitacoraAveria2.setId(2L);
        assertThat(bitacoraAveria1).isNotEqualTo(bitacoraAveria2);
        bitacoraAveria1.setId(null);
        assertThat(bitacoraAveria1).isNotEqualTo(bitacoraAveria2);
    }
}
